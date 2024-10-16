import { connectToDatabase } from "../../../lib/db.js";

async function handler(req, res) {
  if (req.method === "GET") {
    const { limit } = req.query;
    const trailersLimit = parseInt(limit, 10) || 5; // Default to 5 if limit is not provided or is invalid

    const client = await connectToDatabase();
    const db = client.db();

    try {
      // Fetch the specified number of most recent trailers by dateCreated that have a VIN number
      const trailers = await db
        .collection("TrailersNew")
        .find({
          vinNumber: { $exists: true, $type: "string", $regex: `^.{10,}$` },
        })
        .sort({ vinNumberDate: -1 })
        .limit(trailersLimit)
        .toArray();

      res.status(200).json(trailers);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching the trailers." });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
