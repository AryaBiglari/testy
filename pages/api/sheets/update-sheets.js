import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    console.log(data);

    // return;

    const client = await connectToDatabase();

    const db = client.db();

    const filter = {
      $and: [{ material: data.material }, { WT: data.WT }],
    };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        date: data?.date,
        stock: data?.stock,
      },
    };

    const result = await db
      .collection("Sheets Stock")
      .updateOne(filter, updateDoc, options);

    // console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "stock was saved" });

    client.close();
  }

  if (req.method === "GET") {
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Sheets Stock").find().toArray();

    res.json(result);
    // console.log(result);
    client.close();
  }
}

export default handler;
