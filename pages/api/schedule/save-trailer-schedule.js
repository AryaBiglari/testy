import { connectToDatabase } from "../../../lib/db.js";

async function handler(req, res) {
  if (req.method === "POST") {
    const schedules = req.body;

    if (!Array.isArray(schedules)) {
      res.status(400).json({ message: "Invalid data format" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const options = { upsert: true };

    try {
      const results = await Promise.all(
        schedules.map((schedule) => {
          const updateDoc = {
            $set: {
              scheduleArr: schedule.scheduleArr,
              showBoxCompletionDays: schedule.showBoxCompletionDays,
              showTrailerCompletionDays: schedule.showTrailerCompletionDays,
              lastUpdated: new Date(),
            },
          };

          return db
            .collection("Schedule")
            .updateOne({ process: schedule.process }, updateDoc, options);
        })
      );

      res.status(200).json({ message: "Schedules updated", results });
    } catch (error) {
      console.error("Error updating schedules:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
