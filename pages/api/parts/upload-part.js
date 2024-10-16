import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log(data.part);

    // return;

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("External Parts").insertOne(data.part);
    // console.log(result);

    res.status(201).json({
      id: result.insertedId,
      message: "Part was uploaded",
    });

    client.close();
  }

  if (req.method === "GET") {
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("External Parts").find().toArray();

    res.json(result);
    // console.log(result);
    client.close();
  }
}

export default handler;
