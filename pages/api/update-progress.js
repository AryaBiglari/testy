import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log(data.trailer);

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
      $and: [
        { WONumber: data.trailer.WONumber },
        { trailerType: data.trailer.trailerType },
      ],
    };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        status: data.trailer.status,
        wallsList: data.trailer.wallsList,
        dateCompleted: data.trailer.dateCompleted,
      },
    };

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
