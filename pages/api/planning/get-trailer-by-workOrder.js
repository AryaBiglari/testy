import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const { workOrder } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    if (!workOrder) {
      res.status(400).json({ message: "WorkOrder parameter is required" });
      return;
    }

    try {
      const trailers = await db
        .collection("TrailersNew")
        .find({ workOrder: workOrder })
        .toArray();

      if (trailers.length === 0) {
        res.status(404).json({ message: "No trailers found" });
      } else {
        res.status(200).json(trailers);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
