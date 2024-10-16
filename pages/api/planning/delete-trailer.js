import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id, password } = req.body;

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db();

    try {
      // Verify the password
      if (password !== process.env.deletePartPassword) {
        res.status(403).json({ message: "Invalid password" });
        return;
      }

      // Validate the ID format
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      // Define the filter and update objects
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { Archived: true } };

      // Update the document to set Archived to true
      const result = await db.collection("TrailersNew").updateOne(filter, update);

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Trailer not found" });
      } else if (result.modifiedCount === 0) {
        res.status(400).json({ message: "Trailer was already archived" });
      } else {
        res.status(200).json({ message: "Trailer archived successfully" });
      }
    } catch (error) {
      console.error("Error archiving trailer:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      // Ensure the client is closed in both success and error cases
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
