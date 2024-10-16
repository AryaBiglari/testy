import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    const process = data.process;

    const client = await connectToDatabase();

    const db = client.db();

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        scheduleArr: data.scheduleArr,
        date: new Date(),
      },
    };

    try {
      const result = await db.collection("Schedule").updateOne(
        {
          process: process,
        },
        updateDoc,
        options
      );

      console.log(result);

      // Send response back to the client
      res
        .status(200)
        .json({ message: "Schedule updated successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      client.close();
    }
  } else if (req.method === "GET") {
    const { process } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    try {
      if (process) {
        const schedule = await db
          .collection("Schedule")
          .findOne({ process: process });
        res.status(200).json(schedule);
      } else {
        const schedule = await db.collection("Schedule").find({}).toArray();
        res.status(200).json(schedule);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
