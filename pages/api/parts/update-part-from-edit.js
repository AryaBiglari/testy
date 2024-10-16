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
        code: data.part.code,
        unit: data.part.unit,
        supplier: data.part.supplier,
        supplierURL: data.part.supplierURL,
        supplierEmail: data.part.supplierEmail,
        supplierPhone: data.part.supplierPhone,
        specLink: data.part.specLink,
        process: data.part.process,
        orderCycle: data.part.orderCycle,
        minLot: data.part.minLot,
        inProgress: data.part.inProgress,
        location: data.part.location,
        safetyStock: data.part.safetyStock,
        cost: data.part.cost,
        category: data.part.category,
        type: data.part.type,
        position: data.part.position,
        description: data.part.description,
        piecesPerTrailer: data.part.piecesPerTrailer,
        stock: data.part.stock,
        DTAF: data.part?.DTAF,
        status: data.part.status,
        trailerType: data.part.trailerType,
        onshapeName: data.part.onshapeName,
        suppliers: data.part.suppliers,
        comments: data.part.comments,
        onshapeURL: data.part.onshapeURL,
        bendingURL: data.part.bendingURL,
        stockDate: new Date(),
        area: data.part?.area,
      },
    };

    console.log(updateDoc);

    const result = await db.collection("External Parts").updateOne(
      {
        _id: new ObjectId(id),
      },
      updateDoc,
      options
    );

    console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "updated part saved" });

    client.close();
  }
}

export default handler;
