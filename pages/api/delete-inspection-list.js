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
    const { id } = data;
    // console.log(id);
    // return;
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Inspection Lists").deleteOne({
      _id: new ObjectId(id),
    });

    // console.log(result);
    res.status(201).json({ message: "one inspection list was deleted" });

    client.close();
  }

  if (req.method === "GET") {
    return;
  }
}

export default handler;
