import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { vin, inspectionData, comments } = req.body;

    if (!vin || !inspectionData || !comments) {
      res
        .status(400)
        .json({ message: "VIN, inspection data, and comments are required" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    try {
      const result = await db.collection("TrailersNew").updateOne(
        { vinNumber: vin },
        {
          $set: {
            inspectionData: inspectionData,
            comments: comments,
            lastInspection: true, // Set the new field to true
            lastUpdated: new Date(),
          },
        },
        { upsert: true }
      );
      console.log(result);

      if (result.matchedCount === 0 && result.upsertedCount === 0) {
        res.status(404).json({ message: "Trailer not found" });
      } else {
        res
          .status(200)
          .json({
            message: "Inspection data and comments updated successfully",
          });
      }
    } catch (error) {
      console.error("Error updating inspection data and comments:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
