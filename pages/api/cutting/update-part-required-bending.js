import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log("this is the details data");
    // console.log(data);
    const id = data.id;
    const bendingIsRequired = data.bendingIsRequired;
    // console.log(id);
    // console.log(bendingIsRequired);
    // return;

    const client = await connectToDatabase();

    const db = client.db();

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        bendingIsRequired: bendingIsRequired,
      },
    };

    const result = await db.collection("Parts").updateOne(
      {
        _id: new ObjectId(id),
      },
      updateDoc,
      options
    );

    // console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "updated part saved" });

    client.close();
  }
}

export default handler;
