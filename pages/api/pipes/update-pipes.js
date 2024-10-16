import { connectToDatabase } from "../../../lib/db.js";

async function handler(req, res) {
  console.log(`Received ${req.method} request at /api/pipes/update-pipes`);

  if (req.method === "POST") {
    const data = req.body;

    console.log("Received data:", data);

    // Validate incoming data
    const requiredFields = ["partNumber", "material", "shape", "alloy", "diameter", "thickness", "length", "date", "stock"];
    const missingFields = requiredFields.filter(field => !(field in data));

    if (missingFields.length > 0) {
      console.warn(`Missing fields in POST request: ${missingFields.join(", ")}`);
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }

    try {
      const client = await connectToDatabase();
      if (!client) {
        console.error("Failed to connect to the database.");
        return res.status(500).json({ message: "Database connection failed" });
      }

      const db = client.db();

      // Simplify the filter without using $and for a single condition
      const filter = { partNumber: data.partNumber };

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          partNumber: data.partNumber,
          material: data.material,
          shape: data.shape,
          alloy: data.alloy,
          diameter: data.diameter,
          thickness: data.thickness,
          length: data.length,
          date: new Date(data.date),
          stock: data.stock,
        },
      };

      console.log("Updating document with filter:", filter);
      console.log("Update document:", updateDoc);

      const result = await db
        .collection("Pipes Stock")
        .updateOne(filter, updateDoc, options);

      console.log("Update result:", result);

      res
        .status(201)
        .json({ modifiedCount: result.modifiedCount, message: "Stock was saved" });

      client.close();
      console.log("Database connection closed after POST.");
    } catch (error) {
      console.error("Error updating pipe stock:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      if (!client) {
        console.error("Failed to connect to the database.");
        return res.status(500).json({ message: "Database connection failed" });
      }

      const db = client.db();

      console.log("Fetching all pipe stock documents.");

      const result = await db.collection("Pipes Stock").find().toArray();

      console.log(`Fetched ${result.length} pipe stock documents.`);

      res.status(200).json(result);

      client.close();
      console.log("Database connection closed after GET.");
    } catch (error) {
      console.error("Error fetching pipe stock:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Handle unsupported HTTP methods
    console.warn(`Method ${req.method} not allowed on /api/pipes/update-pipes`);
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
