import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log(data);
    // console.log(data.currentTrailer[0].walls);

    const client = await connectToDatabase();

    const db = client.db();

    const filter = {
      $and: [{ workOrder: data.workOrder }, { trailerType: data.trailerType }],
    };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        walls: data.currentTrailer[0].walls,
      },
    };

    const result = await db
      .collection("TrailersNew")
      .updateOne(filter, updateDoc, options);

    // console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "times were saved" });

    client.close();
  }
}

export default handler;
