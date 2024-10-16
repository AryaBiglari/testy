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

    return;

    // console.log(data);

    const client = await connectToDatabase();

    const db = client.db();

    // const result = await db
    //   .collection("Work Orders")
    //   .findOne({ WONumber: data.trailer.WONumber });

    // db.example.find({
    //   $and: [
    //     { x: { $ne: 0 } },
    //     { $expr: { $eq: [{ $divide: [1, "$x"] }, 3] } },
    //   ],
    // });

    // const filter = { WONumber: data.trailer.WONumber };

    const filter = {
      $and: [{ WONumber: data.workOrder }, { trailerType: data.trailer }],
    };

    const options = { upsert: true };

    // const updateDoc = {
    //   $push: {
    //     ["wallsList[0].tasksList[0].pauses"]: "example value",
    //   },
    // };

    // "extraFields.topic1[$stringExample]": {
    //     email: "example value",
    //   },

    // const updateDoc = {
    //   $push: {
    //     [`wallsList.wallName.${data.wallName}`]: "example value",
    //   },
    // };

    const result = await db
      .collection("Work Orders")
      .updateOne(filter, updateDoc, options);

    // console.log(result);

    res
      .status(201)
      .json({ updatedWO: result.status, message: "times were saved" });

    client.close();
  }
}

export default handler;
