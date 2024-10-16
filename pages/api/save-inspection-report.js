import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const id = data.id;
    // console.log(data);

    const client = await connectToDatabase();

    const db = client.db();

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        checkPointsData: data.checkPointsData,
        status: data.status,
        reportDate: new Date(),
        active: false,
        totalCheckpoints: data.totalCheckpoints,
        uncheckedCheckpoints: data.uncheckedCheckpoints,
        reasonsForIncompleted: data?.reasonsForIncompleted,
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
