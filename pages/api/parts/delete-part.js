import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  //   return;
  if (req.method === "POST") {
    const data = req.body;
    const { id } = data;
    const { password } = data;
    // console.log(id, password);
    // console.log(id);
    if (password !== process.env.deletePartPassword) {
      return;
    }
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("External Parts").deleteOne({
      _id: new ObjectId(id),
    });

    // console.log(result);
    res.status(201).json({ message: "Part was deleted" });

    client.close();
  }
}

export default handler;
