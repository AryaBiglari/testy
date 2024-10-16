import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // return;

    const client = await connectToDatabase();

    const db = client.db();

    // const filter = {
    //   $and: [
    //     { _id: data.id },

    //   ],
    // };
    const filter = {
      _id: new ObjectId(data.id),
    };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        partURL: data.url,
      },
    };

    const result = await db
      .collection("Parts")
      .updateOne(filter, updateDoc, options);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "image was saved" });

    client.close();
  }
}

export default handler;
