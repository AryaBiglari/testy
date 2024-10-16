

import { connectToDatabase } from "../../../lib/db.js";

async function handler(req, res) {
    const { method } = req;

    if (method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { from, to } = req.query;

    const dateField = "qualityInspection.initialInspection.startTime";

    let filter = {};


    if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Invalid date format for 'from' or 'to'" });
        }

        filter[dateField] = { $gte: fromDate, $lte: toDate };
    } else if (from || to) {

        return res.status(400).json({ message: "Both 'from' and 'to' dates must be provided together" });
    }

    try {
        const client = await connectToDatabase();
        const db = client.db();

        const projection = {
            "qualityInspection.checkPointsData": 0,
            "qualityInspection.uniqueDeviationsArray": 0,
            checkPointsData: 0,
        };

        const trailers = await db
            .collection("TrailersNew")
            .find(filter, { projection })
            .toArray();

        await client.close();


        const inactiveQCs = trailers.filter(
            (qc) => qc?.qualityInspection && qc.qualityInspection.active === false
        );

        res.status(200).json(inactiveQCs);
    } catch (error) {
        console.error("Error in GET /qc-reports:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default handler;
