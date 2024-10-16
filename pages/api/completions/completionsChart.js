import { connectToDatabase } from "../../../lib/db.js";
import { parseISO, isValid, startOfDay, endOfDay } from "date-fns";

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req, res) {
  if (req.method === "GET") {
    try {

      let { from, to, interval } = req.query;


      const client = await connectToDatabase();
      const db = client.db();


      if (!from || !to || !interval) {
        console.error("Missing required query parameters: from, to, interval.");
        res
          .status(400)
          .json({ message: "from, to, and interval parameters are required." });
        client.close();
        return;
      }


      let fromDate = parseISO(from);
      let toDate = parseISO(to);

      if (!isValid(fromDate) || !isValid(toDate)) {
        console.error(
          `Invalid date format. from: ${from}, to: ${to}. Expected ISO format (YYYY-MM-DD).`
        );
        res.status(400).json({
          message: "Invalid date format. Use ISO format (YYYY-MM-DD).",
        });
        client.close();
        return;
      }


      fromDate = startOfDay(fromDate);
      toDate = endOfDay(toDate);

      const fromDateStr = fromDate.toISOString();
      const toDateStr = toDate.toISOString();

      console.log(`Date Range - From: ${fromDateStr}, To: ${toDateStr}`);


      let sideWallsCount = 0;
      let otherWallsCount = 0;
      let framesCount = 0;
      let boxesCount = 0;
      let trailersCount = 0;




      console.log("Starting walls count aggregation...");

      const wallsCursor = db
        .collection("TrailersNew")
        .find({}, { projection: { walls: 1, workOrder: 1, customer: 1, trailerType: 1 } });

      await wallsCursor.forEach((trailer) => {
        if (Array.isArray(trailer.walls)) {
          trailer.walls.forEach((wall) => {
            if (wall.completedDate) {
              const wallCompletedDate = new Date(wall.completedDate);
              if (wallCompletedDate >= fromDate && wallCompletedDate <= toDate) {
                if (wall.wallType.toLowerCase().includes("side wall")) {
                  sideWallsCount++;
                } else {
                  otherWallsCount++;
                }
              }
            }
          });
        }
      });

      console.log(
        `Walls Count - Side Walls: ${sideWallsCount}, Other Walls: ${otherWallsCount}`
      );




      console.log("Starting frames count aggregation...");

      const framesCursor = db.collection("TrailersNew").find(
        {},
        {
          projection: {
            "frontFrameTimeData.completedDate": 1,
            "rearFrameTimeData.completedDate": 1,
          },
        }
      );

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
              frontCompletedDate >= fromDate &&
              frontCompletedDate <= toDate
            ) {
              frameCountPerTrailer++;
            }
          } else {
            console.warn(
              `Invalid frontFrameTimeData.completedDate: ${trailer.frontFrameTimeData.completedDate}`
            );
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
            if (rearCompletedDate >= fromDate && rearCompletedDate <= toDate) {
              frameCountPerTrailer++;
            }
          } else {
            console.warn(
              `Invalid rearFrameTimeData.completedDate: ${trailer.rearFrameTimeData.completedDate}`
            );
          }
        }

        framesCount += frameCountPerTrailer;
      });

      console.log(`Frames Count: ${framesCount}`);




      console.log("Starting boxes count aggregation...");

      const boxesAggregation = [
        {
          $match: { "boxData.stages": { $exists: true, $not: { $size: 0 } } },
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
          $count: "boxesCount",
        },
      ];

      const boxesResult = await db
        .collection("TrailersNew")
        .aggregate(boxesAggregation)
        .toArray();

      boxesCount = boxesResult[0]?.boxesCount || 0;

      console.log(`Boxes Count: ${boxesCount}`);




      console.log("Starting trailers count aggregation...");

      const trailersCursor = db.collection("TrailersNew").find(
        {
          completed: true,
          completedDate: { $gte: fromDateStr, $lte: toDateStr },
        },
        { projection: { workOrder: 1, customer: 1, trailerType: 1, completedDate: 1 } }
      );

      await trailersCursor.forEach(() => {
        trailersCount++;
      });

      console.log(`Trailers Count: ${trailersCount}`);




      const responseData = {
        from: fromDateStr,
        to: toDateStr,
        sideWallsCount,
        otherWallsCount,
        framesCount,
        boxesCount,
        trailersCount,
      };

      let detailedData = [];




      console.log("Starting detailed data aggregations...");




      const wallsDetailedAggregation = [
        {
          $match: {
            "walls": { $exists: true, $not: { $size: 0 } },
            $expr: {
              $and: [
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$workOrder", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$customer", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$trailerType", ""] } },
                      },
                    },
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
        { $unwind: "$walls" },
        {
          $match: {
            "walls.completedDate": { $gte: fromDateStr, $lte: toDateStr },
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
            employeeLogs: "$walls.employeeLogs",
          },
        },
      ];

      const wallsDetailsCursor = db
        .collection("TrailersNew")
        .aggregate(wallsDetailedAggregation);

      const wallsDetails = [];

      await wallsDetailsCursor.forEach((wall) => {
        const {
          wallType,
          workOrder,
          customer,
          trailerType,
          completedDate,
          startedDate,
          employeeLogs,
        } = wall;


        if (
          wallType === "Side Wall - Driver" ||
          wallType === "Side Wall - Passenger"
        ) {
          console.log(`\n--- Debugging Wall: ${wallType} ---`);
          console.log(`Work Order: ${workOrder}`);
          console.log(`Customer: ${customer}`);
          console.log(`Trailer Type: ${trailerType}`);
          console.log(`Completed Date: ${completedDate}`);
          console.log(`Started Date: ${startedDate}`);
          console.log(`Employee Logs: ${JSON.stringify(employeeLogs, null, 2)}`);
        }


        if (!workOrder) {
          console.warn(`⚠️ Missing workOrder for wallType: ${wallType}`);
        }
        if (!customer) {
          console.warn(`⚠️ Missing customer for wallType: ${wallType}`);
        }
        if (!trailerType) {
          console.warn(`⚠️ Missing trailerType for wallType: ${wallType}`);
        }


        const employeeTimeMap = {};

        if (Array.isArray(employeeLogs)) {
          employeeLogs.forEach((log) => {
            const startTime = new Date(log.startTime).getTime();
            const endTime = new Date(log.endTime).getTime();

            if (isNaN(startTime) || isNaN(endTime)) {
              console.warn(
                `⚠️ Invalid startTime or endTime in employeeLogs for wallType: ${wallType}`
              );
              return;
            }

            const durationSeconds = (endTime - startTime) / 1000;

            if (durationSeconds < 0) {
              console.warn(
                `⚠️ Negative duration in employeeLogs for wallType: ${wallType}`
              );
              return;
            }

            if (Array.isArray(log.employees)) {
              log.employees.forEach((emp) => {
                if (emp.employeeID) {
                  if (!employeeTimeMap[emp.employeeID]) {
                    employeeTimeMap[emp.employeeID] = { ...emp, timeWorked: 0 };
                  }
                  employeeTimeMap[emp.employeeID].timeWorked += durationSeconds;
                } else {
                  console.warn(
                    `⚠️ Missing employeeID in employees for wallType: ${wallType}`
                  );
                }
              });
            } else {
              console.warn(
                `⚠️ Missing or invalid employees array in employeeLogs for wallType: ${wallType}`
              );
            }
          });
        } else {
          console.warn(`⚠️ Missing employeeLogs array for wallType: ${wallType}`);
        }


        const employeesWithTimeWorked = Object.values(employeeTimeMap);


        if (
          wallType === "Side Wall - Driver" ||
          wallType === "Side Wall - Passenger"
        ) {
          console.log(
            `Employees With Time Worked for ${wallType}: ${JSON.stringify(
              employeesWithTimeWorked,
              null,
              2
            )}`
          );
        }


        if (
          workOrder &&
          workOrder.trim() !== "" &&
          customer &&
          customer.trim() !== "" &&
          trailerType &&
          trailerType.trim() !== ""
        ) {
          wallsDetails.push({
            category: "walls",
            wallType,
            workOrder,
            customer,
            trailerType,
            completedDate,
            startedDate,
            employees: employeesWithTimeWorked,
          });
        } else {
          console.warn(
            `⚠️ Skipping wallType: ${wallType} due to missing or empty critical fields.`
          );
        }
      });

      console.log(
        `Detailed Walls Data - Total Walls Processed: ${wallsDetails.length}`
      );




      console.log("Aggregating detailed frames data...");

      const framesDetailedAggregation = [
        {
          $match: {
            $or: [
              {
                "frontFrameTimeData.completedDate": {
                  $gte: fromDateStr,
                  $lte: toDateStr,
                },
              },
              {
                "rearFrameTimeData.completedDate": {
                  $gte: fromDateStr,
                  $lte: toDateStr,
                },
              },
            ],

            $expr: {
              $and: [
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$workOrder", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$customer", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$trailerType", ""] } },
                      },
                    },
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
          if (frontCompletedDate >= fromDate && frontCompletedDate <= toDate) {
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

            const uniqueFrontEmployees = getUniqueEmployees(frontEmployees);


            if (
              workOrder &&
              workOrder.trim() !== "" &&
              customer &&
              customer.trim() !== "" &&
              trailerType &&
              trailerType.trim() !== ""
            ) {
              framesDetails.push({
                category: "frames",
                type: "Front Frame",
                workOrder,
                customer,
                trailerType,
                completedDate: frontFrameTimeData.completedDate,
                startedDate: frontFrameTimeData.startDate,
                employees: uniqueFrontEmployees,
              });
            } else {
              console.warn(
                `⚠️ Skipping Front Frame due to missing or empty critical fields. Work Order: ${workOrder}, Customer: ${customer}, Trailer Type: ${trailerType}`
              );
            }
          }
        }


        if (rearFrameTimeData && rearFrameTimeData.completedDate) {
          const rearCompletedDate = new Date(rearFrameTimeData.completedDate);
          if (rearCompletedDate >= fromDate && rearCompletedDate <= toDate) {
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

            const uniqueRearEmployees = getUniqueEmployees(rearEmployees);


            if (
              workOrder &&
              workOrder.trim() !== "" &&
              customer &&
              customer.trim() !== "" &&
              trailerType &&
              trailerType.trim() !== ""
            ) {
              framesDetails.push({
                category: "frames",
                type: "Rear Frame",
                workOrder,
                customer,
                trailerType,
                completedDate: rearFrameTimeData.completedDate,
                startedDate: rearFrameTimeData.startDate,
                employees: uniqueRearEmployees,
              });
            } else {
              console.warn(
                `⚠️ Skipping Rear Frame due to missing or empty critical fields. Work Order: ${workOrder}, Customer: ${customer}, Trailer Type: ${trailerType}`
              );
            }
          }
        }
      });

      console.log(
        `Detailed Frames Data - Total Frames Processed: ${framesDetails.length}`
      );




      console.log("Aggregating detailed boxes data...");

      const boxesDetailedAggregation = [
        {
          $match: {
            "boxData.stages": { $exists: true, $not: { $size: 0 } },
            $expr: {
              $and: [
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$workOrder", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$customer", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$trailerType", ""] } },
                      },
                    },
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


        if (
          workOrder &&
          workOrder.trim() !== "" &&
          customer &&
          customer.trim() !== "" &&
          trailerType &&
          trailerType.trim() !== ""
        ) {
          boxesDetails.push({
            category: "boxes",
            workOrder,
            customer,
            trailerType,
            completedDate,
            startedDate,
            employees: uniqueEmployees,
          });
        } else {
          console.warn(
            `⚠️ Skipping Box due to missing or empty critical fields. Work Order: ${workOrder}, Customer: ${customer}, Trailer Type: ${trailerType}`
          );
        }
      });

      console.log(
        `Detailed Boxes Data - Total Boxes Processed: ${boxesDetails.length}`
      );




      console.log("Aggregating detailed trailers data...");

      const trailersDetailedAggregation = [
        {
          $match: {
            completed: true,
            completedDate: { $gte: fromDateStr, $lte: toDateStr },
            $expr: {
              $and: [
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$workOrder", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$customer", ""] } },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $strLenCP: {
                        $trim: { input: { $ifNull: ["$trailerType", ""] } },
                      },
                    },
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
                      $gt: [
                        {
                          $strLenCP: {
                            $trim: { input: { $ifNull: ["$$emp.employeeID", ""] } },
                          },
                        },
                        0,
                      ],
                    },
                  ],
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
        console.log("---- Processing Trailer ----");
        console.log(`Work Order: ${trailer.workOrder}`);
        console.log(`Customer: ${trailer.customer}`);
        console.log(`Trailer Type: ${trailer.trailerType}`);
        console.log(`Completed Date: ${trailer.completedDate}`);
        console.log(`Employees: ${JSON.stringify(trailer.employees, null, 2)}`);


        if (!trailer.workOrder) {
          console.warn(
            `⚠️ Missing workOrder for Trailer, Customer: ${trailer.customer}`
          );
        }
        if (!trailer.customer) {
          console.warn(
            `⚠️ Missing customer for Trailer, Work Order: ${trailer.workOrder}`
          );
        }
        if (!trailer.trailerType) {
          console.warn(
            `⚠️ Missing trailerType for Trailer, Work Order: ${trailer.workOrder}`
          );
        }


        const uniqueEmployees = getUniqueEmployees(trailer.employees);


        if (
          trailer.workOrder &&
          trailer.workOrder.trim() !== "" &&
          trailer.customer &&
          trailer.customer.trim() !== "" &&
          trailer.trailerType &&
          trailer.trailerType.trim() !== ""
        ) {
          trailersDetails.push({
            category: "trailers",
            workOrder: trailer.workOrder,
            customer: trailer.customer,
            trailerType: trailer.trailerType,
            completedDate: trailer.completedDate,
            employees: uniqueEmployees,
          });
        } else {
          console.warn(
            `⚠️ Skipping Trailer due to missing or empty critical fields. Work Order: ${trailer.workOrder}, Customer: ${trailer.customer}, Trailer Type: ${trailer.trailerType}`
          );
        }
      });

      console.log(
        `Detailed Trailers Data - Total Trailers Processed: ${trailersDetails.length}`
      );




      detailedData = [
        ...wallsDetails,
        ...framesDetails,
        ...boxesDetails,
        ...trailersDetails,
      ];


      detailedData = detailedData.filter(
        (item) =>
          item.workOrder &&
          item.workOrder.trim() !== "" &&
          item.customer &&
          item.customer.trim() !== "" &&
          item.trailerType &&
          item.trailerType.trim() !== ""
      );

      console.log(`Total Detailed Data Items: ${detailedData.length}`);
      console.log("Sending API response...");

      responseData.detailedData = detailedData;




      res.status(200).json(responseData);
      client.close();
    } catch (error) {
      console.error("Error in completionsChart.js:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
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
