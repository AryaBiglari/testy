import { connectToDatabase } from "../../../lib/db.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const { vin } = req.query;

    if (!vin) {
      res.status(400).json({ message: "VIN number is required" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    try {
      const trailer = await db
        .collection("TrailersNew")
        .findOne({ vinNumber: vin });

      if (!trailer) {
        res.status(404).json({ message: "Trailer not found" });
      } else {
        res.status(200).json(trailer);
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
