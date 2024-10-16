import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const id = data.id;
    const inspectionProgress = data.inspectionProgress;
    // console.log(data);

    const client = await connectToDatabase();

    const db = client.db();

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        "qualityInspection.checkPointsData": data.checkPointsData,
        "qualityInspection.status": "In Progress",
        "qualityInspection.inspectionProgress": inspectionProgress,
      },
    };

    const result = await db.collection("Inspection Lists").updateOne(
      {
        _id: new ObjectId(id),
      },
      updateDoc,
      options
    );

    // console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "inspection progress saved" });

    client.close();
  }
}

export default handler;
