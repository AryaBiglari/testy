import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    if (!Array.isArray(data.parts)) {
      res
        .status(400)
        .json({ message: "Invalid data format. Expected an array of parts." });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const options = { upsert: true };

    const bulkOps = data.parts.map((part) => {
      return {
        updateOne: {
          filter: { _id: new ObjectId(part._id) },
          update: {
            $set: {
              mat: part.mat,
              WT: part.WT,
              part: part.part,
              process: part.process,
              position: part.position,
              description: part.description,
              piecesPerTrailer: part.piecesPerTrailer,
              stock: part.stock,
              DTAF: part?.DTAF,
              status: part.status,
              trailerType: part.trailerType,
              onshapeName: part.onshapeName,
              onshapeURL: part.onshapeURL,
              bendingURL: part.bendingURL,
              stockDate: new Date(),
              area: part?.area,
            },
          },
          upsert: true,
        },
      };
    });

    const result = await db.collection("Parts").bulkWrite(bulkOps);

    res.status(201).json({
      updatedCount: result.modifiedCount,
      message: "Parts updated successfully",
    });

    client.close();
  }
}

export default handler;
