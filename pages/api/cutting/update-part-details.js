import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log("this is the details data");
    // console.log(data);
    // console.log(data.liftAxle);
    const id = data.id;
    // console.log(id);
    // return;

    const client = await connectToDatabase();

    const db = client.db();

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        fenderType: data.fendersType,
        config: data.config,
        doors: data.doors,
        doorsOpening: data.doorsOpening,
        liftAxle: data.liftAxle,
        airInflation: data.airInflation,
        doorSize: data.doorSize,
        specialReq: data.specialReq,
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
