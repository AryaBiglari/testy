import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log("this is the data");
    // console.log(data.part);
    const id = data.part._id;
    // console.log(id);
    // return;

    const client = await connectToDatabase();

    const db = client.db();

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        mat: data.part.mat,
        WT: data.part.WT,
        part: data.part.part,
        process: data.part.process,
        position: data.part.position,
        description: data.part.description,
        piecesPerTrailer: data.part.piecesPerTrailer,
        stock: data.part.stock,
        DTAF: data.part?.DTAF,
        status: data.part.status,
        onshapeName: data.part.onshapeName,
        onshapeURL: data.part.onshapeURL,
        bendingURL: data.part.bendingURL,
        stockDate: new Date(),
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
