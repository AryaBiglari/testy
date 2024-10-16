

import { connectToDatabase } from "../../../lib/db.js";
import { parseISO, isValid, subDays, addDays } from "date-fns";

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { from, to, interval, detail, category, wallType } = req.query;

      const client = await connectToDatabase();
      const db = client.db();


      let fromDate = from ? parseISO(from) : subDays(new Date(), 7);
      let toDate = to ? parseISO(to) : new Date();


      toDate = addDays(toDate, 1);

      if (!isValid(fromDate) || !isValid(toDate)) {
        res
          .status(400)
          .json({ message: "Invalid date format. Use ISO format (YYYY-MM-DD)." });
        client.close();
        return;
      }

      if (fromDate > toDate) {
        [fromDate, toDate] = [toDate, fromDate];
      }

      const fromDateStr = fromDate.toISOString();
      const toDateStr = toDate.toISOString();
      const fromDateObj = new Date(fromDateStr);
      const toDateObj = new Date(toDateStr);

      let sideWallsCount = 0;
      let otherWallsCount = 0;
      let framesCount = 0;
      let boxesCount = 0;
      let trailersCount = 0;




      const wallsAggregation = [
        {
          $match: {
            "walls": { $exists: true, $not: { $size: 0 } },
            $expr: {
              $and: [
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                    0,
                  ],
                },
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                    0,
                  ],
                },
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                    0,
                  ],
                },
              ],
            },
          },
        },
        {
          $unwind: "$walls",
        },
        {
          $match: {
            "walls.completedDate": { $gte: fromDateStr, $lte: toDateStr },
          },
        },
        {
          $project: {
            wallType: "$walls.wallType",
            completedDate: "$walls.completedDate",
          },
        },
      ];

      const wallsCursor = db.collection("TrailersNew").aggregate(wallsAggregation);

      await wallsCursor.forEach((wall) => {
        if (wall.completedDate) {
          const wallCompletedDate = new Date(wall.completedDate);
          if (wallCompletedDate >= fromDateObj && wallCompletedDate <= toDateObj) {
            if (wall.wallType.toLowerCase().includes("side wall")) {
              sideWallsCount++;
            } else {
              otherWallsCount++;
            }
          }
        }
      });




      const framesAggregation = [
        {
          $match: {
            $or: [
              { "frontFrameTimeData.completedDate": { $gte: fromDateStr, $lte: toDateStr } },
              { "rearFrameTimeData.completedDate": { $gte: fromDateStr, $lte: toDateStr } },
            ],
            $expr: {
              $and: [
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                    0,
                  ],
                },
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                    0,
                  ],
                },
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                    0,
                  ],
                },
              ],
            },
          },
        },
        {
          $project: {
            "frontFrameTimeData.completedDate": 1,
            "rearFrameTimeData.completedDate": 1,
          },
        },
      ];

      const framesCursor = db.collection("TrailersNew").aggregate(framesAggregation);

      await framesCursor.forEach((trailer) => {
        let frameCountPerTrailer = 0;

        if (
          trailer.frontFrameTimeData &&
          trailer.frontFrameTimeData.completedDate
        ) {
          const frontCompletedDate = new Date(
            trailer.frontFrameTimeData.completedDate
          );
          if (!isNaN(frontCompletedDate)) {
            if (
              frontCompletedDate >= fromDateObj &&
              frontCompletedDate <= toDateObj
            ) {
              frameCountPerTrailer++;
            }
          }
        }

        if (
          trailer.rearFrameTimeData &&
          trailer.rearFrameTimeData.completedDate
        ) {
          const rearCompletedDate = new Date(
            trailer.rearFrameTimeData.completedDate
          );
          if (!isNaN(rearCompletedDate)) {
            if (rearCompletedDate >= fromDateObj && rearCompletedDate <= toDateObj) {
              frameCountPerTrailer++;
            }
          }
        }

        framesCount += frameCountPerTrailer;
      });




      const boxesAggregation = [
        { $match: { "boxData.stages": { $exists: true, $not: { $size: 0 } } } },
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
          $count: "boxesCount",
        },
      ];

      const boxesResult = await db
        .collection("TrailersNew")
        .aggregate(boxesAggregation)
        .toArray();

      boxesCount = boxesResult[0]?.boxesCount || 0;




      const trailersAggregation = [
        {
          $match: {
            completed: true,
            completedDate: { $gte: fromDateStr, $lte: toDateStr },
            $expr: {
              $and: [
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                    0,
                  ],
                },
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                    0,
                  ],
                },
                {
                  $gt: [
                    { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                    0,
                  ],
                },
              ],
            },
          },
        },
        {
          $count: "trailersCount",
        },
      ];

      const trailersResult = await db
        .collection("TrailersNew")
        .aggregate(trailersAggregation)
        .toArray();

      trailersCount = trailersResult[0]?.trailersCount || 0;




      const responseData = {
        from: fromDateStr,
        to: toDateStr,
        sideWallsCount,
        otherWallsCount,
        framesCount,
        boxesCount,
        trailersCount,
      };




      if (detail === "true" && category) {
        if (category === "trailers") {

          const trailersDetailedAggregation = [
            {
              $match: {
                completed: true,
                completedDate: { $gte: fromDateStr, $lte: toDateStr },
                $expr: {
                  $and: [
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: 1,

                wallsEmployees: {
                  $cond: [
                    { $isArray: "$walls" },
                    {
                      $reduce: {
                        input: "$walls",
                        initialValue: [],
                        in: {
                          $concatArrays: [
                            "$$value",
                            {
                              $cond: [
                                { $isArray: "$$this.employeeLogs" },
                                {
                                  $reduce: {
                                    input: "$$this.employeeLogs",
                                    initialValue: [],
                                    in: {
                                      $concatArrays: [
                                        "$$value",
                                        { $ifNull: ["$$this.employees", []] },
                                      ],
                                    },
                                  },
                                },
                                [],
                              ],
                            },
                          ],
                        },
                      },
                    },
                    [],
                  ],
                },

                boxesEmployees: {
                  $cond: [
                    { $isArray: "$boxData.stages" },
                    {
                      $reduce: {
                        input: "$boxData.stages",
                        initialValue: [],
                        in: {
                          $concatArrays: [
                            "$$value",
                            {
                              $cond: [
                                { $isArray: "$$this.employeeLogs" },
                                {
                                  $reduce: {
                                    input: "$$this.employeeLogs",
                                    initialValue: [],
                                    in: {
                                      $concatArrays: [
                                        "$$value",
                                        { $ifNull: ["$$this.employees", []] },
                                      ],
                                    },
                                  },
                                },
                                [],
                              ],
                            },
                          ],
                        },
                      },
                    },
                    [],
                  ],
                },

                frontFrameEmployees: {
                  $cond: [
                    { $isArray: "$frontFrameTimeData.employeeLogs" },
                    {
                      $reduce: {
                        input: "$frontFrameTimeData.employeeLogs",
                        initialValue: [],
                        in: {
                          $concatArrays: [
                            "$$value",
                            { $ifNull: ["$$this.employees", []] },
                          ],
                        },
                      },
                    },
                    [],
                  ],
                },

                rearFrameEmployees: {
                  $cond: [
                    { $isArray: "$rearFrameTimeData.employeeLogs" },
                    {
                      $reduce: {
                        input: "$rearFrameTimeData.employeeLogs",
                        initialValue: [],
                        in: {
                          $concatArrays: [
                            "$$value",
                            { $ifNull: ["$$this.employees", []] },
                          ],
                        },
                      },
                    },
                    [],
                  ],
                },
              },
            },
            {
              $project: {
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: 1,
                employees: {
                  $concatArrays: [
                    "$wallsEmployees",
                    "$boxesEmployees",
                    "$frontFrameEmployees",
                    "$rearFrameEmployees",
                  ],
                },
              },
            },
            {
              $project: {
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: 1,
                employees: { $ifNull: ["$employees", []] },
              },
            },
            {
              $project: {
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: 1,
                employees: {
                  $filter: {
                    input: "$employees",
                    as: "emp",
                    cond: {
                      $and: [
                        { $ne: ["$$emp", null] },
                        { $ne: ["$$emp.employeeID", null] },
                        {
                          $and: [
                            {
                              $gt: [
                                { $strLenCP: { $trim: { input: { $ifNull: ["$$emp.workOrder", ""] } } } },
                                0,
                              ],
                            },
                            {
                              $gt: [
                                { $strLenCP: { $trim: { input: { $ifNull: ["$$emp.customer", ""] } } } },
                                0,
                              ],
                            },
                            {
                              $gt: [
                                { $strLenCP: { $trim: { input: { $ifNull: ["$$emp.trailerType", ""] } } } },
                                0,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
            {
              $project: {
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: 1,
                employees: {
                  $map: {
                    input: "$employees",
                    as: "emp",
                    in: {
                      employeeID: "$$emp.employeeID",
                      firstName: "$$emp.firstName",
                      lastName: "$$emp.lastName",
                      timeWorked: {
                        $divide: [
                          { $subtract: ["$$emp.endTime", "$$emp.startTime"] },
                          1000,
                        ],
                      },
                    },
                  },
                },
              },
            },
          ];

          const trailersDetailsCursor = db
            .collection("TrailersNew")
            .aggregate(trailersDetailedAggregation);

          const trailersDetails = [];

          await trailersDetailsCursor.forEach((trailer) => {
            console.log(
              "Trailer Details Before Deduplication:",
              JSON.stringify(trailer, null, 2)
            );

            trailersDetails.push({
              workOrder: trailer.workOrder,
              customer: trailer.customer,
              trailerType: trailer.trailerType,
              completedDate: trailer.completedDate,
              employees: trailer.employees,
            });
          });
          console.log(
            "Trailers Details After Aggregation:",
            JSON.stringify(trailersDetails, null, 2)
          );


          const deduplicatedTrailersDetails = trailersDetails.map((trailer) => {
            const uniqueEmployees = Array.from(
              new Map(
                trailer.employees
                  .filter((emp) => emp && emp.employeeID)
                  .map((emp) => [emp.employeeID, emp])
              ).values()
            );
            return {
              ...trailer,
              employees: uniqueEmployees,
            };
          });


          responseData.detailedData = deduplicatedTrailersDetails;
        } else if (category === "boxes") {

          const boxesDetailedAggregation = [
            {
              $match: {
                "boxData.stages": { $exists: true, $not: { $size: 0 } },
                $expr: {
                  $and: [
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                lastStage: { $arrayElemAt: ["$boxData.stages", -1] },
                boxData: 1,
                workOrder: 1,
                customer: 1,
                trailerType: 1,
              },
            },
            {
              $match: {
                "lastStage.completedDate": { $gte: fromDateStr, $lte: toDateStr },
              },
            },
            {
              $project: {
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: "$lastStage.completedDate",
                stages: "$boxData.stages",
              },
            },
          ];

          const boxesDetailsCursor = db
            .collection("TrailersNew")
            .aggregate(boxesDetailedAggregation);

          const boxesDetails = [];

          await boxesDetailsCursor.forEach((box) => {
            const { workOrder, customer, trailerType, completedDate, stages } = box;


            console.log("---- Processing Box ----");
            console.log(`Work Order: ${workOrder}`);
            console.log(`Customer: ${customer}`);
            console.log(`Trailer Type: ${trailerType}`);
            console.log(`Completed Date: ${completedDate}`);
            console.log(`Stages: ${JSON.stringify(stages, null, 2)}`);


            if (!workOrder) {
              console.warn(`⚠️ Missing workOrder for Box, Customer: ${customer}`);
            }
            if (!customer) {
              console.warn(`⚠️ Missing customer for Box, Work Order: ${workOrder}`);
            }
            if (!trailerType) {
              console.warn(
                `⚠️ Missing trailerType for Box, Work Order: ${workOrder}`
              );
            }

            const firstStage = stages[0];
            const startedDate = firstStage ? firstStage.startedDate : null;

            const allEmployees = stages.reduce((acc, stage) => {
              if (Array.isArray(stage.employeeLogs)) {
                stage.employeeLogs.forEach((log) => {
                  if (Array.isArray(log.employees)) {
                    acc.push(...log.employees);
                  }
                });
              }
              return acc;
            }, []);

            console.log(`Employees: ${JSON.stringify(allEmployees, null, 2)}`);

            const uniqueEmployees = getUniqueEmployees(allEmployees);

            boxesDetails.push({
              workOrder,
              customer,
              trailerType,
              completedDate,
              startedDate,
              employees: uniqueEmployees,
            });
          });

          console.log(
            `Detailed Boxes Data - Total Boxes Processed: ${boxesDetails.length}`
          );

          responseData.detailedData = boxesDetails;
        } else if (category === "walls") {

          const wallsDetailedAggregation = [
            {
              $match: {
                "walls": { $exists: true, $not: { $size: 0 } },
                $expr: {
                  $and: [
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                walls: 1,
                workOrder: 1,
                customer: 1,
                trailerType: 1,
              },
            },
            {
              $unwind: "$walls",
            },
            {
              $match: {
                "walls.completedDate": { $gte: fromDateStr, $lte: toDateStr },
                ...(wallType
                  ? wallType === "Side Wall"
                    ? { "walls.wallType": { $regex: /^Side Wall/i } }
                    : { "walls.wallType": { $not: /^Side Wall/i } }
                  : {}),
              },
            },
            {
              $project: {
                wallType: "$walls.wallType",
                workOrder: 1,
                customer: 1,
                trailerType: 1,
                completedDate: "$walls.completedDate",
                startedDate: "$walls.startedDate",
                employees: "$walls.employeeLogs.employees",
              },
            },
          ];

          const wallsDetailsCursor = db.collection("TrailersNew").aggregate(wallsDetailedAggregation);

          const wallsDetails = [];

          await wallsDetailsCursor.forEach((wall) => {
            const { wallType, workOrder, customer, trailerType, completedDate, startedDate, employees } = wall;

            const flatEmployees = Array.isArray(employees)
              ? employees.flat(Infinity)
              : [];

            const uniqueEmployees = getUniqueEmployees(flatEmployees);

            wallsDetails.push({
              wallType,
              workOrder,
              customer,
              trailerType,
              completedDate,
              startedDate,
              employees: uniqueEmployees,
            });
          });

          console.log(
            `Detailed Walls Data - Total Walls Processed: ${wallsDetails.length}`
          );

          responseData.detailedData = wallsDetails;
        } else if (category === "frames") {

          const framesDetailedAggregation = [
            {
              $match: {
                $or: [
                  { "frontFrameTimeData.completedDate": { $gte: fromDateStr, $lte: toDateStr } },
                  { "rearFrameTimeData.completedDate": { $gte: fromDateStr, $lte: toDateStr } },
                ],
                $expr: {
                  $and: [
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$workOrder", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$customer", ""] } } } },
                        0,
                      ],
                    },
                    {
                      $gt: [
                        { $strLenCP: { $trim: { input: { $ifNull: ["$trailerType", ""] } } } },
                        0,
                      ],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                frontFrameTimeData: 1,
                rearFrameTimeData: 1,
                workOrder: 1,
                customer: 1,
                trailerType: 1,
              },
            },
          ];

          const framesDetailsCursor = db
            .collection("TrailersNew")
            .aggregate(framesDetailedAggregation);

          const framesDetails = [];

          await framesDetailsCursor.forEach((trailer) => {
            const {
              frontFrameTimeData,
              rearFrameTimeData,
              workOrder,
              customer,
              trailerType,
            } = trailer;


            if (frontFrameTimeData && frontFrameTimeData.completedDate) {
              const frontCompletedDate = new Date(frontFrameTimeData.completedDate);
              if (frontCompletedDate >= fromDateObj && frontCompletedDate <= toDateObj) {
                const frontEmployees = Array.isArray(
                  frontFrameTimeData.employeeLogs
                )
                  ? frontFrameTimeData.employeeLogs.flatMap(
                    (log) => log.employees || []
                  )
                  : [];

                console.log("---- Processing Front Frame ----");
                console.log(`Work Order: ${workOrder}`);
                console.log(`Customer: ${customer}`);
                console.log(`Trailer Type: ${trailerType}`);
                console.log(`Completed Date: ${frontFrameTimeData.completedDate}`);
                console.log(`Started Date: ${frontFrameTimeData.startDate}`);
                console.log(`Employees: ${JSON.stringify(frontEmployees, null, 2)}`);


                if (!workOrder) {
                  console.warn(
                    `⚠️ Missing workOrder for Front Frame, Customer: ${customer}`
                  );
                }
                if (!customer) {
                  console.warn(
                    `⚠️ Missing customer for Front Frame, Work Order: ${workOrder}`
                  );
                }
                if (!trailerType) {
                  console.warn(
                    `⚠️ Missing trailerType for Front Frame, Work Order: ${workOrder}`
                  );
                }

                const uniqueFrontEmployees = getUniqueEmployees(frontEmployees);

                framesDetails.push({
                  type: "Front Frame",
                  workOrder,
                  customer,
                  trailerType,
                  completedDate: frontFrameTimeData.completedDate,
                  startedDate: frontFrameTimeData.startDate,
                  employees: uniqueFrontEmployees,
                });
              }
            }


            if (rearFrameTimeData && rearFrameTimeData.completedDate) {
              const rearCompletedDate = new Date(rearFrameTimeData.completedDate);
              if (rearCompletedDate >= fromDateObj && rearCompletedDate <= toDateObj) {
                const rearEmployees = Array.isArray(
                  rearFrameTimeData.employeeLogs
                )
                  ? rearFrameTimeData.employeeLogs.flatMap(
                    (log) => log.employees || []
                  )
                  : [];

                console.log("---- Processing Rear Frame ----");
                console.log(`Work Order: ${workOrder}`);
                console.log(`Customer: ${customer}`);
                console.log(`Trailer Type: ${trailerType}`);
                console.log(`Completed Date: ${rearFrameTimeData.completedDate}`);
                console.log(`Started Date: ${rearFrameTimeData.startDate}`);
                console.log(`Employees: ${JSON.stringify(rearEmployees, null, 2)}`);


                if (!workOrder) {
                  console.warn(
                    `⚠️ Missing workOrder for Rear Frame, Customer: ${customer}`
                  );
                }
                if (!customer) {
                  console.warn(
                    `⚠️ Missing customer for Rear Frame, Work Order: ${workOrder}`
                  );
                }
                if (!trailerType) {
                  console.warn(
                    `⚠️ Missing trailerType for Rear Frame, Work Order: ${workOrder}`
                  );
                }

                const uniqueRearEmployees = getUniqueEmployees(rearEmployees);

                framesDetails.push({
                  type: "Rear Frame",
                  workOrder,
                  customer,
                  trailerType,
                  completedDate: rearFrameTimeData.completedDate,
                  startedDate: rearFrameTimeData.startDate,
                  employees: uniqueRearEmployees,
                });
              }
            }
          });

          console.log(
            `Detailed Frames Data - Total Frames Processed: ${framesDetails.length}`
          );

          responseData.detailedData = framesDetails;
        } else {

          res.status(400).json({ message: "Invalid category parameter." });
          client.close();
          return;
        }
      }

      res.status(200).json(responseData);
      client.close();
    } catch (error) {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    console.error("Error in completions.js:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

function getUniqueEmployees(employees) {
  if (!employees || employees.length === 0) return [];
  const uniqueEmployees = Array.from(
    new Map(employees.map((emp) => [emp.employeeID, emp])).values()
  );
  return uniqueEmployees;
}

export default handler;

function normalizeWorkOrder(workOrder) {
  if (!workOrder) return '';
  return workOrder.toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

function mergeIntervals(intervals) {
  if (!intervals.length) return [];

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const current = intervals[i];

    if (current[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

function parseDateString(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}
