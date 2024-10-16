import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

// export const maxDuration = 300; // This function can run for a maximum of 5 seconds
// export const dynamic = "force-dynamic";

// export function GET(request) {
//   return new Response("Vercel", {
//     status: 200,
//   });
// }

export const config = {
  maxDuration: 60,
};

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const result = await db
      .collection("TrailersNew")
      .insertOne({ dateCreated: new Date(), ...data });

    res.status(201).json({
      updatedWO: result.insertedId,
      message: "Trailer was added",
    });

    client.close();
  }

  if (req.method === "GET") {
    const { id, workOrder, trailerType } = req.query;
    const client = await connectToDatabase();
    const db = client.db();

    // const projection = {
    //   "qualityInspection.checkPointsData": 0,
    //   "qualityInspection.uniqueDeviationsArray": 0,
    //   checkPointsData: 0,
    // };

    const projection = {
      trailerType: 1,
      workOrder: 1,
      walls: 1,
      wallsSelected: 1,
    };

    if (id) {
      // Fetch specific trailer by ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      const trailer = await db
        .collection("TrailersNew")
        .findOne({ _id: new ObjectId(id) });

      if (!trailer) {
        res.status(404).json({ message: "Trailer not found" });
      } else {
        res.status(200).json(trailer);
      }
    } else if (workOrder && trailerType) {
      // Fetch specific trailer by workOrder and trailerType
      const trailer = await db
        .collection("TrailersNew")
        .findOne({ workOrder: workOrder, trailerType: trailerType });

      if (!trailer) {
        res.status(404).json({ message: "Trailer not found" });
      } else {
        res.status(200).json(trailer);
      }
    } else {
      // Fetch all trailers
      console.log("fetch all trailers");
      const result = await db
        .collection("TrailersNew")
        .find({}, { projection })
        .toArray();
      console.log(result);

      res.status(200).json(result);
    }

    client.close();
  }
}

export default handler;
