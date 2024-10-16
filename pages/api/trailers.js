import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";
import leadWallsTaskList from "../../lib/leadWallsTaskList.js";
import tri2HWallsTasks from "../../lib/tri2HWallsTasks.js";
import tri3HWallsTasks from "../../lib/tri3HWallsTasks.js";
import pupWallsTasksList from "../../lib/pupWallsTasksList.js";
import tandemWallsTasksList from "../../lib/tandemWallsTasksList.js";
import fourAxleWallsTasks from "../../lib/fourAxleWallsTasks.js";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log(data);
    // return;

    const wallsListGenerator = (trailerType) => {
      if (trailerType === "Tri 3 Hoppers") {
        return tri3HWallsTasks;
      }
      if (trailerType === "Tri 2 Hoppers") {
        return tri2HWallsTasks;
      }
      if (trailerType === "Tandem") {
        return tandemWallsTasksList;
      }
      if (trailerType === "Pup") {
        return pupWallsTasksList;
      }
      if (trailerType === "Lead") {
        return leadWallsTaskList;
      }
      if (trailerType === "4 Axle") {
        return fourAxleWallsTasks;
      }
    };

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Work Orders").insertOne({
      WONumber: 0,
      trailerType: "Tri 2 Hoppers",
      status: "Not Started",
      dateRequired: "2024-04-30T19:00:00.408Z",
      dateCompleted: "",
      wallsList: wallsListGenerator("Tri 2 Hoppers"),
    });

    res.status(201).json({
      updatedWO: result.insertedId,
      message: "trailer walls were added",
    });

    client.close();
  }

  if (req.method === "GET") {
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Work Orders").find().toArray();

    res.json(result);
    // console.log(result);
    client.close();
  }
}

export default handler;
