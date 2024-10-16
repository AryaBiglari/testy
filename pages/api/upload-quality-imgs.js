import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  // console.log("exec");
  if (req.method === "POST") {
    const data = req.body;

    // return;

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Quality Deviations").insertOne({
      workOrder: data.workOrder,
      trailerType: data.trailerType,
      checkID: data.checkID,
      deviationType: data.deviationType,
      comments: data.comments,
      sectionName: data.sectionName,
      checkpointDescription: data.checkpointDescription,
      subSectionDescription: data.subSectionDescription,
      url: data.url,
      isCorrection: data.isCorrection,
    });

    res.status(201).json({
      updatedWO: result.insertedId,
      message: "image data has been stored in DB",
    });

    client.close();
  }

  if (req.method === "GET") {
    // console.log("exec");

    const query = req.query;

    const client = await connectToDatabase();

    const db = client.db();

    const filter = {
      $and: [
        { workOrder: query.workOrder },
        { trailerType: query.trailerType },
      ],
    };

    const result = await db
      .collection("Quality Deviations")
      .find(filter)
      .toArray();

    res.json(result);

    client.close();
  }
}

export default handler;
