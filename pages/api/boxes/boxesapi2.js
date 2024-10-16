import { connectToDatabase } from "../../../lib/db.js";

async function handleBoxesDB(req, res) {
  if (req.method === "POST") {
    const { workOrder, trailerType, updates, batchUpdates } = req.body;

    const client = await connectToDatabase();
    const db = client.db("test");

    if (batchUpdates && Array.isArray(batchUpdates)) {
      const bulkOperations = batchUpdates.map(
        ({ workOrder, trailerType, updates }) => ({
          updateOne: {
            filter: { workOrder, trailerType },
            update: { $set: updates },
          },
        })
      );

      const result = await db.collection("Trailers").bulkWrite(bulkOperations);

      client.close();

      res.status(200).json({
        message: "Batch update completed successfully",
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    } else {
      const filter = { workOrder, trailerType };
      const updateDoc = {
        $set: updates,
      };

      const result = await db
        .collection("Trailers")
        .updateOne(filter, updateDoc);

      client.close();

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Trailer not found" });
      } else if (result.modifiedCount === 0) {
        res.status(200).json({ message: "No changes made" });
      } else {
        res.status(200).json({ message: "Trailer updated successfully" });
      }
    }
  }

  if (req.method === "GET") {
    const client = await connectToDatabase();

    const db = client.db("test");
    const type = req?.query?.type;
    let pipeline;

    const projection = {
      trailerType: 1,
      workOrder: 1,
      boxData: 1,
      isReadyForBoxStage: 1,
      futureJig: 1,

      //parts
      boxStage1: 1,
      boxStage2: 2,
      boxStage3: 3,
      boxStage4: 4,

      // specs
      customer: 1,
      trailerWallHeight: 1,
      trailerLenght: 1,
      frontSlope: 1,
      rearSlope: 1,
      specialTrailerLength: 1,
      specialTrailerWallHeight: 1,
      specialTrailerFrontSlope: 1,
      specialTrailerRearSlope: 1,
      tires: 1,
      rims: 1,
      fendersType: 1,
      hoppersType: 1,
      sideLights: 1,
      rearCustomerLogo: 1,
      interiorSteps: 1,
      wallsSurface: 1,
      wLights: 1,
      slopesUnderglow: 1,
      hoppersUnderglow: 1,
      interiorLights: 1,
      unloadLights: 1,
      doorSize: 1,
      frontDoorOpens: 1,
      rearDoorOpens: 1,
      midDoorOpens: 1,
      chuteLocks: 1,
      hammerHits: 1,
      doorsOpening: 1,
      airInflation: 1,
      liftAxle: 1,
      electricTarpOpener: 1,
      frontFrameSurface: 1,
      rearFrameSurface: 1,
      frontFrameParts: 1,
      rearFrameParts: 1,
    };

    if (!type) {
    }

    if (type === "onJig") {
      pipeline = [
        {
          $match: {
            isReadyForBoxStage: "currently on jig",
          },
        },
        {
          $sort: {
            dateRequired: 1,
          },
        },
        {
          $project: projection,
        },
      ];
    } else if ("ready") {
      pipeline = [
        {
          $match: {
            isReadyForBoxStage: "ready",
          },
        },
        {
          $sort: {
            dateRequired: 1,
          },
        },
        {
          $project: projection,
        },
      ];
    }

    const result = await db
      .collection("Trailers")
      .aggregate(pipeline)
      // .find({}, { projection })
      .toArray();

    res.json(result);
    client.close();
  }

  if (req.method === "DELETE") {
    const { secret } = req.body;
    if (secret !== "password") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const client = await connectToDatabase();
    const db = client.db("test");

    const result = await db.collection("Trailers").deleteMany({});
    client.close();

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "No data found to delete" });
    } else {
      res
        .status(200)
        .json({ message: `Deleted ${result.deletedCount} documents` });
    }
  }
}

export default handleBoxesDB;
