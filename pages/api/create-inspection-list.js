import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";
import leadWallsTaskList from "../../lib/leadWallsTaskList.js";
import tri2HWallsTasks from "../../lib/tri2HWallsTasks.js";
import tri3HWallsTasks from "../../lib/tri3HWallsTasks.js";
import pupWallsTasksList from "../../lib/pupWallsTasksList.js";
import tandemWallsTasksList from "../../lib/tandemWallsTasksList.js";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // console.log(data);

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Inspection Lists").insertOne({
      inspectorName: data.inspectorName,
      workOrder: data.workOrder,
      trailerType: data.trailerType,
      tires: data.tires,
      doorsOpeningDirection: data.doorsOpeningDirection,
      fendersType: data.fendersType,
      airInflation: data.airInflation,
      optionalFeatures: data.optionalFeatures,
      startingDate: new Date(),
      active: true,
      finalActive: false,
      checkPointsData: data.check,
    });

    res.status(201).json({
      updatedWO: result.insertedId,
      message: "inspection list was created",
    });

    client.close();
  }

  if (req.method === "GET") {
    const client = await connectToDatabase();
    const db = client.db();

    // const query = req.query;

    // console.log("hola");
    // console.log(query);

    // const filter = {
    //   $and: [
    //     { workOrder: query.workOrder },
    //     { trailerType: query.trailerType },
    //   ],
    // };

    // const options = { upsert: true };

    // const updateDoc = {
    //   $set: {
    //     status: data.trailer.status,
    //     wallsList: data.trailer.wallsList,
    //     dateCompleted: data.trailer.dateCompleted,
    //   },
    // };

    const result = await db.collection("Inspection Lists").find().toArray();

    // const result = await db
    //   .collection("Inspection Lists")
    //   .findOne({ active: "false" });

    // console.log(result);

    res.json(result);
    client.close();
  }

  if (req.method === "PUT") {
    const { id, updates } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db("test");

    const updateDoc = {
      $set: updates, // This will update only the fields provided in 'updates'
    };

    const result = await db
      .collection("Inspection Lists")
      .updateOne({ _id: new ObjectId(id) }, updateDoc);

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Inspection list not found" });
    } else if (result.modifiedCount === 0) {
      res.status(200).json({ message: "No changes made" });
    } else {
      res.status(200).json({ message: "Inspection list updated successfully" });
    }

    client.close();
  }
}

export default handler;
