import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";
import leadWallsTaskList from "../../lib/leadWallsTaskList.js";
import tri2HWallsTasks from "../../lib/tri2HWallsTasks.js";
import tri3HWallsTasks from "../../lib/tri3HWallsTasks.js";
import pupWallsTasksList from "../../lib/pupWallsTasksList.js";
import tandemWallsTasksList from "../../lib/tandemWallsTasksList.js";

async function handler(req, res) {
  //   console.log("tried");
  if (req.method === "POST") {
    return;
    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Inspection Lists").deleteOne({
      _id: new ObjectId(id),
    });

    res.status(201).json({ message: "one inspection list was deleted" });

    client.close();
  }


  if (req.method === "GET") {
    const { id, trailerType, wo } = req.query;

    // return;
    const client = await connectToDatabase();
    const db = client.db();

    if (id) {
      try {
        const inspectionList = await db
          .collection('Inspection Lists')
          .findOne({ _id: new ObjectId(id) });
  
        if (!inspectionList) {
          return res.status(404).json({ error: 'Inspection list not found' });
        }
  
        return res.status(200).json(inspectionList);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch inspection list by ID' });
      }
    }

    const query = {};
    if (trailerType) {
      query.trailerType = trailerType;
    }
    if (wo) {
      query.workOrder = wo;
    }

    try {
      const inspectionLists = await db
        .collection('Inspection Lists')
        .find(query)
        .toArray();
  
      res.status(200).json(inspectionLists);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inspection lists' });
    }

    // console.log(result);
    // res.json(res);

    client.close();
  }
  // if (req.method === "GET") {
  //   const id = req.query.id;

  //   // console.log(id);
  //   // return;
  //   const client = await connectToDatabase();

  //   const db = client.db();

  //   const result = await db.collection("Inspection Lists").findOne({
  //     _id: new ObjectId(id),
  //   });

  //   // console.log(result);
  //   res.json(result);

  //   client.close();
  // }
}

export default handler;
