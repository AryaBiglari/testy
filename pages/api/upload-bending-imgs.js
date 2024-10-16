import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log("bending img upload api");
    // console.log(data);

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
        bendingURL: data.url,
        bendingIsRequired: true,
      },
    };

    const result = await db
      .collection("Parts")
      .updateOne(filter, updateDoc, options);

    // console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "Bending image was saved" });

    client.close();
  }
}

export default handler;
