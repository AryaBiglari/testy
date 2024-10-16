import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const result = await db
      .collection("Trailers")
      .insertOne({ dateCreated: new Date(), ...data });

    res.status(201).json({
      updatedWO: result.insertedId,
      message: "Trailer was added",
    });

    client.close();
  }

  if (req.method === "GET") {
    const { id, workOrder, trailerType } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    const projection = {
      "qualityInspection.checkPointsData": 0,
      "qualityInspection.uniqueDeviationsArray": 0,
    };

    if (id) {
      // Fetch specific trailer by ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      const trailer = await db
        .collection("Trailers")
        .findOne({ _id: new ObjectId(id) });

      if (!trailer) {
        res.status(404).json({ message: "Trailer not found" });
      } else {
        res.status(200).json(trailer);
      }
    } else if (workOrder && trailerType) {
      // Fetch specific trailer by workOrder and trailerType
      const trailer = await db
        .collection("Trailers")
        .findOne({ workOrder: workOrder, trailerType: trailerType });

      if (!trailer) {
        res.status(404).json({ message: "Trailer not found" });
      } else {
        res.status(200).json(trailer);
      }
    } else {
      // Fetch all trailers
      const result = await db
        .collection("Trailers")
        .find({}, { projection })
        .toArray();

      res.status(200).json(result);
    }

    client.close();
  }

  if (req.method === "PUT") {
    const { id, updates } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const updateDoc = {
      $set: updates, // This will update only the fields provided in 'updates'
    };

    const result = await db
      .collection("Trailers")
      .updateOne({ _id: new ObjectId(id) }, updateDoc);

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Trailer not found" });
    } else if (result.modifiedCount === 0) {
      res.status(200).json({ message: "No changes made" });
    } else {
      res.status(200).json({ message: "Trailer updated successfully" });
    }

    client.close();
  }
  if (req.method === "DELETE") {
    const { id, password } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    if (password !== process.env.deletePartPassword) {
      res.status(403).json({ message: "Invalid password" });
      return;
    }

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const result = await db
      .collection("Trailers")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Trailer not found" });
    } else {
      res.status(200).json({ message: "Trailer deleted successfully" });
    }

    client.close();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
