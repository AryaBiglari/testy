import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log(data);
    // return;

    // const wallsListGenerator = (trailerType) => {
    //   if (trailerType === "Tri 3 Hoppers") {
    //     return tri3HWallsTasks;
    //   }
    //   if (trailerType === "Tri 2 Hoppers") {
    //     return tri2HWallsTasks;
    //   }
    //   if (trailerType === "Tandem") {
    //     return tandemWallsTasksList;
    //   }
    //   if (trailerType === "Pup") {
    //     return pupWallsTasksList;
    //   }
    //   if (trailerType === "Lead") {
    //     return leadWallsTaskList;
    //   }
    // };

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection("Trailer Walls").insertOne({
      dateRequired: "2024-04-27T19:00:00.408Z",
      WO: "44747",
      trailerType: "Pup",
      walls: [
        {
          wallType: "Side Wall - Driver",
          defaultImage: "/images/walls/defaultPup/driver",
          completedImage: "/images/walls/completedPup/driver",
          wallDrawings: [
            "/images/pup/1300-PUP-1.png",
            "/images/pup/1300-PUP-2.png",
            "/images/pup/1300-PUP-3.png",
            "/images/pup/1300-PUP-4.png",
            "/images/pup/1300-PUP-5.png",
          ],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
        {
          wallType: "Side Wall - Passenger",
          defaultImage: "/images/walls/defaultPup/pass",
          completedImage: "/images/walls/completedPup/pass",
          wallDrawings: [
            "/images/pup/1300-PUP-1.png",
            "/images/pup/1300-PUP-2.png",
            "/images/pup/1300-PUP-3.png",
            "/images/pup/1300-PUP-4.png",
            "/images/pup/1300-PUP-5.png",
          ],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
        {
          wallType: "Front Top",
          defaultImage: "/images/walls/defaultPup/top-front",
          completedImage: "/images/walls/completedPup/top-front",
          wallDrawings: ["/images/pup/1301-PUP-1.png"],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
        {
          wallType: "Rear Top",
          defaultImage: "/images/walls/defaultPup/top-rear",
          completedImage: "/images/walls/completedPup/top-rear",
          wallDrawings: ["/images/pup/1304-PUP-1.png"],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
        {
          wallType: "Front Slope",
          defaultImage: "/images/walls/defaultPup/front-slope",
          completedImage: "/images/walls/completedPup/front-slope",
          wallDrawings: ["/images/pup/1302-PUP-1.png"],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
        {
          wallType: "Rear Slope",
          defaultImage: "/images/walls/defaultPup/rear-slope",
          completedImage: "/images/walls/completedPup/rear-slope",
          wallDrawings: ["/images/pup/1305-PUP-1.png"],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
        {
          wallType: "Mid Wall",
          defaultImage: "/images/walls/defaultPup/midwall",
          completedImage: "/images/walls/completedPup/midwall",
          wallDrawings: [
            "/images/pup/1303-PUP-1.png",
            "/images/pup/1303-PUP-2.png",
          ],
          specialRequirements: "",
          status: "notStarted",
          startedDate: null,
          completedDate: null,
          isActive: false,
          firstStart: false,
          time: 0,
        },
      ],
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

    const result = await db.collection("TrailersNew").find().toArray();

    res.json(result);
    // console.log(result);
    client.close();
  }
}

export default handler;
