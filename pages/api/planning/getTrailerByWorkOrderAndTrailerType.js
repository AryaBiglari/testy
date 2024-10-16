import { connectToDatabase } from "../../../lib/db.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const { workOrder, trailerType } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    if (!workOrder && !trailerType) {
      res
        .status(400)
        .json({ message: "WorkOrder or TrailerType parameter is required" });
      return;
    }

    const query = {};
    if (workOrder) query.workOrder = workOrder;
    if (trailerType) query.trailerType = trailerType;

    try {
      const trailers = await db.collection("TrailersNew").find(query).toArray();

      if (trailers.length === 0) {
        res.status(404).json({ message: "No trailers found" });
      } else if (trailers.length > 1) {
        res.status(400).json({ message: "Error: Multiple trailers found" });
      } else {
        res.status(200).json(trailers[0]);
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
