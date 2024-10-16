

import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handleBoxesDB(req, res) {
  if (req.method === "POST") {
    const { workOrder, trailerType, updates, batchUpdates, _id } = req.body;

    const client = await connectToDatabase();
    const db = client.db("test");

    if (batchUpdates && Array.isArray(batchUpdates)) {

      const bulkOperations = batchUpdates.map(
        ({ workOrder, trailerType, updates }) => ({
          updateOne: {
            filter: { workOrder, trailerType },
            update: { $set: updates },
          },
        })
      );

      try {
        const result = await db.collection("TrailersNew").bulkWrite(bulkOperations);
        console.log("Bulk Write Result:", result);
        client.close();

        res.status(200).json({
          message: "Batch update completed successfully",
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        });
      } catch (error) {
        console.error("Batch update error:", error);
        client.close();
        res.status(500).json({ message: "Batch update failed", error: error.message });
      }
    } else {


      let filter = {};
      if (_id) {

        let objectId;
        try {
          objectId = new ObjectId(_id);
        } catch (error) {
          console.error("Invalid _id format:", _id);
          res.status(400).json({ message: "Invalid trailer ID (_id)" });
          client.close();
          return;
        }
        filter = { _id: objectId };
      } else if (workOrder && trailerType) {

        filter = { workOrder, trailerType };
      } else {

        res.status(400).json({ message: "Missing trailer identifier (_id or workOrder and trailerType)" });
        client.close();
        return;
      }

      const updateDoc = {
        $set: updates,
      };

      try {
        console.log("Attempting to update trailer:", { filter, updates });

        const result = await db.collection("TrailersNew").updateOne(filter, updateDoc);
        console.log("Update Result:", result);

        client.close();

        if (result.matchedCount === 0) {
          res.status(404).json({ message: "Trailer not found" });
        } else if (result.modifiedCount === 0) {
          res.status(200).json({ message: "No changes made" });
        } else {
          res.status(200).json({ message: "Trailer updated successfully" });
        }
      } catch (error) {
        console.error("Single update error:", error);
        client.close();
        res.status(500).json({ message: "Trailer update failed", error: error.message });
      }

    }
  }

  if (req.method === "GET") {
    let client;

    try {
      client = await connectToDatabase();
      const db = client.db("test");
      const type = req.query.type;

      let pipeline;

      // Define the base filter to exclude archived trailers
      const baseMatch = {
        Archived: { $ne: true }, // Exclude archived trailers
      };

      // Define additional match criteria based on the type
      let additionalMatch = {};

      if (type === "onJig") {
        additionalMatch.isReadyForBoxStage = "currently on jig";
      } else if (type === "ready") {
        additionalMatch.isReadyForBoxStage = "ready";
      } else {
        res.status(400).json({ message: "Invalid query type." });
        return;
      }

      // Combine baseMatch with additionalMatch
      const finalMatch = { ...baseMatch, ...additionalMatch };

      // Define the aggregation pipeline
      pipeline = [
        {
          $match: finalMatch,
        },
        {
          $sort: {
            dateRequired: 1, // Sort by dateRequired in ascending order
          },
        },
        {
          $project: {
            trailerType: 1,
            customer: 1,
            workOrder: 1,
            dateRequired: 1,
            _id: 1,
            boxData: 1, // Include boxData only for "onJig" and "ready" types
          },
        },
      ];

      // For "ready" type, exclude boxData from the projection if necessary
      // If "ready" should have a different projection, adjust accordingly
      // For now, assuming both types include boxData

      console.log("GET Request Type:", type);
      const result = await db.collection("TrailersNew").aggregate(pipeline).toArray();
      console.log(`Found ${result.length} trailers for type "${type}"`);
      res.status(200).json(result);
    } catch (error) {
      console.error("GET request error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
      if (client) {
        client.close();
      }
    }
  }


  if (req.method === "DELETE") {
    const { secret } = req.body;
    if (secret !== "password") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const client = await connectToDatabase();
    const db = client.db("test");

    try {
      const result = await db.collection("TrailersNew").deleteMany({});
      console.log(`Deleted ${result.deletedCount} trailers`);
      client.close();

      if (result.deletedCount === 0) {
        res.status(404).json({ message: "No data found to delete" });
      } else {
        res
          .status(200)
          .json({ message: `Deleted ${result.deletedCount} documents` });
      }
    } catch (error) {
      console.error("DELETE request error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }


  else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handleBoxesDB;
