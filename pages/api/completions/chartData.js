import { connectToDatabase } from "../../../lib/db.js";
import { parseISO, isValid, addDays, startOfWeek, endOfWeek } from "date-fns";

export const config = {
    api: {
        bodyParser: true,
    },
};

async function handler(req, res) {
    if (req.method === "GET") {
        console.log("Charts");
        try {
            const { from, to, interval } = req.query;

            const client = await connectToDatabase();
            const db = client.db();

            let fromDate = from ? parseISO(from) : null;
            let toDate = to ? parseISO(to) : null;

            toDate = addDays(toDate, 1);

            if (interval == "week") {
                fromDate = startOfWeek(fromDate);
                toDate = endOfWeek(toDate);
            }

            if (!fromDate || !toDate || !isValid(fromDate) || !isValid(toDate)) {
                res
                    .status(400)
                    .json({ message: "Invalid or missing 'from' and 'to' date parameters." });
                client.close();
                return;
            }

            if (!interval || !["day", "week"].includes(interval)) {
                res.status(400).json({ message: "Invalid or missing 'interval' parameter." });
                client.close();
                return;
            }

            const fromDateStr = fromDate.toISOString();
            const toDateStr = toDate.toISOString();

            let dateFormat = "%Y-%m-%d";

            if (interval === "week") {
                dateFormat = "%Y-%m-%d";
            }

            /**
             * 1. wallsData Aggregation
             */
            const wallsData = await db
                .collection("TrailersNew")
                .aggregate([
                    { $unwind: "$walls" },
                    {
                        $match: {
                            "walls.completedDate": { $gte: fromDateStr, $lte: toDateStr },
                            $expr: {
                                $gt: [
                                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                                    0,
                                ],
                            },
                        },
                    },
                    {
                        $addFields: {
                            completedDate: {
                                $dateFromString: { dateString: "$walls.completedDate" },
                            },
                            wallType: {
                                $cond: [
                                    { $regexMatch: { input: "$walls.wallType", regex: /Side Wall/i } },
                                    "Side Walls",
                                    "Other Walls",
                                ],
                            },
                        },
                    },
                    {
                        $addFields: {
                            groupDate:
                                interval === "week"
                                    ? {
                                        $dateTrunc: {
                                            date: "$completedDate",
                                            unit: "week",
                                            binSize: 1,
                                            timezone: "UTC",
                                            startOfWeek: "monday",
                                        },
                                    }
                                    : "$completedDate",
                        },
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: { format: dateFormat, date: "$groupDate" },
                                },
                                wallType: "$wallType",
                            },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: { "_id.date": 1 },
                    },
                ])
                .toArray();

            /**
             * 2. framesData Aggregation
             */
            const framesData = await db
                .collection("TrailersNew")
                .aggregate([
                    {
                        $match: {
                            $or: [
                                { "frontFrameTimeData.completedDate": { $gte: fromDateStr, $lte: toDateStr } },
                                { "rearFrameTimeData.completedDate": { $gte: fromDateStr, $lte: toDateStr } },
                            ],
                            $expr: {
                                $gt: [
                                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                                    0,
                                ],
                            },
                        },
                    },
                    {
                        $project: {
                            dates: [
                                "$frontFrameTimeData.completedDate",
                                "$rearFrameTimeData.completedDate",
                            ],
                        },
                    },
                    { $unwind: "$dates" },
                    {
                        $match: {
                            dates: { $gte: fromDateStr, $lte: toDateStr },
                        },
                    },
                    {
                        $addFields: {
                            completedDate: {
                                $dateFromString: { dateString: "$dates" },
                            },
                        },
                    },
                    {
                        $addFields: {
                            groupDate:
                                interval === "week"
                                    ? {
                                        $dateTrunc: {
                                            date: "$completedDate",
                                            unit: "week",
                                            binSize: 1,
                                            timezone: "UTC",
                                            startOfWeek: "monday",
                                        },
                                    }
                                    : "$completedDate",
                        },
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: { format: dateFormat, date: "$groupDate" },
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: { "_id.date": 1 },
                    },
                ])
                .toArray();

            /**
             * 3. boxesData Aggregation
             */
            const boxesData = await db
                .collection("TrailersNew")
                .aggregate([
                    {
                        $match: {
                            "boxData.stages": { $exists: true, $not: { $size: 0 } },
                            $expr: {
                                $gt: [
                                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                                    0,
                                ],
                            },
                        },
                    },
                    {
                        $project: {
                            lastStage: { $arrayElemAt: ["$boxData.stages", -1] },
                        },
                    },
                    {
                        $match: {
                            "lastStage.completedDate": { $gte: fromDateStr, $lte: toDateStr },
                        },
                    },
                    {
                        $addFields: {
                            completedDate: {
                                $dateFromString: { dateString: "$lastStage.completedDate" },
                            },
                        },
                    },
                    {
                        $addFields: {
                            groupDate:
                                interval === "week"
                                    ? {
                                        $dateTrunc: {
                                            date: "$completedDate",
                                            unit: "week",
                                            binSize: 1,
                                            timezone: "UTC",
                                            startOfWeek: "monday",
                                        },
                                    }
                                    : "$completedDate",
                        },
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: { format: dateFormat, date: "$groupDate" },
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: { "_id.date": 1 },
                    },
                ])
                .toArray();

            /**
             * 4. trailersData Aggregation
             */
            const trailersData = await db
                .collection("TrailersNew")
                .aggregate([
                    {
                        $match: {
                            completedDate: { $gte: fromDateStr, $lte: toDateStr },
                            $expr: {
                                $gt: [
                                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                                    0,
                                ],
                            },
                        },
                    },
                    {
                        $project: {
                            dates: ["$completedDate"],
                        },
                    },
                    { $unwind: "$dates" },
                    {
                        $addFields: {
                            completedDate: {
                                $dateFromString: { dateString: "$dates" },
                            },
                        },
                    },
                    {
                        $addFields: {
                            groupDate:
                                interval === "week"
                                    ? {
                                        $dateTrunc: {
                                            date: "$completedDate",
                                            unit: "week",
                                            binSize: 1,
                                            timezone: "UTC",
                                            startOfWeek: "monday",
                                        },
                                    }
                                    : "$completedDate",
                        },
                    },
                    {
                        $group: {
                            _id: {
                                date: {
                                    $dateToString: { format: dateFormat, date: "$groupDate" },
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: { "_id.date": 1 },
                    },
                ])
                .toArray();

            /**
             * 5. Merging the Data
             */
            const mergeData = (wallsData, framesData, boxesData, trailersData) => {
                const dataMap = {};

                wallsData.forEach((item) => {
                    const date = item._id.date;
                    const wallType = item._id.wallType;
                    if (!dataMap[date]) {
                        dataMap[date] = {
                            date,
                            sideWallsCount: 0,
                            otherWallsCount: 0,
                            framesCount: 0,
                            boxesCount: 0,
                            trailersCount: 0
                        };
                    }
                    if (wallType === "Side Walls") {
                        dataMap[date].sideWallsCount = item.count;
                    } else {
                        dataMap[date].otherWallsCount = item.count;
                    }
                });

                framesData.forEach((item) => {
                    const date = item._id.date;
                    if (!dataMap[date]) {
                        dataMap[date] = {
                            date,
                            sideWallsCount: 0,
                            otherWallsCount: 0,
                            framesCount: 0,
                            boxesCount: 0,
                            trailersCount: 0
                        };
                    }
                    dataMap[date].framesCount = item.count;
                });

                boxesData.forEach((item) => {
                    const date = item._id.date;
                    if (!dataMap[date]) {
                        dataMap[date] = {
                            date,
                            sideWallsCount: 0,
                            otherWallsCount: 0,
                            framesCount: 0,
                            boxesCount: 0,
                            trailersCount: 0
                        };
                    }
                    dataMap[date].boxesCount = item.count;
                });

                trailersData.forEach((item) => {
                    const date = item._id.date;
                    if (!dataMap[date]) {
                        dataMap[date] = {
                            date,
                            sideWallsCount: 0,
                            otherWallsCount: 0,
                            framesCount: 0,
                            boxesCount: 0,
                            trailersCount: 0
                        };
                    }
                    dataMap[date].trailersCount = item.count;
                });

                return Object.values(dataMap).sort((a, b) => (a.date > b.date ? 1 : -1));
            };

            const mergedData = mergeData(wallsData, framesData, boxesData, trailersData);

            /**
             * 6. Preparing the Response
             */
            const responseData = {
                from: fromDateStr,
                to: toDateStr,
                interval,
                data: mergedData,
            };

            res.status(200).json(responseData);
            client.close();
        } catch (error) {
            console.error("Error in chartData.js:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;
