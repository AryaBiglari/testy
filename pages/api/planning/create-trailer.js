import checkpointsData from "../../../lib/checkpointsData.js";
import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("TrailersNew");

    if (req.method === "POST") {
      const data = req.body;

      
      if (!data.trailerType) {
        res.status(400).json({ message: "trailerType is required" });
        return;
      }

      
      const result = await collection.insertOne({
        dateCreated: new Date(),
        ...data,
      });

      res.status(201).json({
        updatedWO: result.insertedId,
        message: "Trailer was added",
      });
    } else if (req.method === "GET") {
      const { id, workOrder, trailerType } = req.query;

      let projection = {};

      
      const baseFilter = { Archived: { $ne: true } };

      if (id) {
        
        if (!ObjectId.isValid(id)) {
          res.status(400).json({ message: "Invalid ID format" });
          return;
        }

        const trailer = await collection.findOne(
          { _id: new ObjectId(id) },
          { projection } 
        );

        if (!trailer) {
          res.status(404).json({ message: "Trailer not found" });
        } else {
          res.status(200).json(trailer);
        }
      } else if (workOrder && trailerType) {
        
        projection = {
          "qualityInspection.checkPointsData": 0,
          "qualityInspection.uniqueDeviationsArray": 0,
          checkPointsData: 0,
        };

        const trailer = await collection.findOne(
          {
            ...baseFilter,
            workOrder: workOrder,
            trailerType: trailerType,
          },
          { projection }
        );

        if (!trailer) {
          res.status(404).json({ message: "Trailer not found" });
        } else {
          res.status(200).json(trailer);
        }
      } else {
        
        projection = {
          "qualityInspection.checkPointsData": 0,
          "qualityInspection.uniqueDeviationsArray": 0,
          checkPointsData: 0,
        };

        const trailers = await collection
          .find(baseFilter, { projection })
          .toArray();

        res.status(200).json(trailers);
      }
    }
    else if (req.method === "PUT") {
      const { id, updates } = req.body;

      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      
      if (updates.trailerType === "") {
        res.status(400).json({ message: "trailerType cannot be empty" });
        return;
      }

      const collectionSchedule = db.collection("Schedule");

      
      const currentTrailer = await collection.findOne({
        _id: new ObjectId(id),
      });

      if (!currentTrailer) {
        res.status(404).json({ message: "Trailer not found" });
        return;
      }

      const oldWorkOrder = currentTrailer.workOrder;
      const oldCustomer = currentTrailer.customer;

      
      const updateDoc = {
        $set: updates, 
      };

      const updateResult = await collection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc,
        { upsert: false }
      );

      if (updateResult.matchedCount === 0) {
        res.status(404).json({ message: "Trailer not found" });
        return;
      }

      
      const newWorkOrder = updates.workOrder || oldWorkOrder;
      const newCustomer = updates.customer || oldCustomer;

      const scheduleUpdateResult = await collectionSchedule.updateMany(
        { "scheduleArr.trailerId": id },
        {
          $set: {
            "scheduleArr.$[elem].WO": newWorkOrder,
            "scheduleArr.$[elem].customer": newCustomer,
          },
        },
        { arrayFilters: [{ "elem.trailerId": id }] }
      );

      console.log(
        `Updated WO from '${oldWorkOrder}' to '${newWorkOrder}' and customer from '${oldCustomer}' to '${newCustomer}' in ${scheduleUpdateResult.modifiedCount} schedule(s) for trailerId ${id}`
      );

      res.status(200).json({
        message: "Trailer and schedule updated successfully",
      });
    } else if (req.method === "DELETE") {
      const { id, password } = req.query;

      
      if (password !== process.env.deletePartPassword) {
        res.status(403).json({ message: "Invalid password" });
        return;
      }

      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      
      const update = {
        $set: {
          Archived: true,
          ArchivedAt: new Date(),
        },
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        update
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Trailer not found" });
      } else if (result.modifiedCount === 0) {
        res.status(400).json({ message: "Trailer was already archived" });
      } else {
        res.status(200).json({ message: "Trailer archived successfully" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Handler Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (client) {
      client.close();
    }
  }
}

export default handler;