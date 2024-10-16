import { connectToDatabase } from "../../../lib/db.js";
import { ObjectId } from "mongodb";

async function handleEmployeesDB(req, res) {
  const { method } = req;

  if (method === "POST") {
    const data = req.body;

    try {
      const client = await connectToDatabase();
      const db = client.db("test");

      const result = await db
        .collection("Employees")
        .insertOne({ dateCreated: new Date(), ...data });

      res.status(201).json({
        employeeId: result.insertedId,
        message: "Employee was added successfully",
      });

      client.close();
    } catch (error) {
      console.error("POST /api/employees/employeesinfo Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  if (method === "GET") {
    const { employeeID, employeeIDs } = req.query;

    try {
      const client = await connectToDatabase();
      const db = client.db("test");

      if (employeeIDs) {
        const idsArray = employeeIDs.split(",");
        const employees = await db
          .collection("Employees")
          .find({ employeeID: { $in: idsArray } })
          .toArray();
        res.status(200).json(employees);
      } else if (employeeID) {
        const employee = await db.collection("Employees").findOne({ employeeID: employeeID });
        if (!employee) {
          res.status(404).json({ message: "Employee not found" });
        } else {
          res.status(200).json(employee);
        }
      } else {
        const result = await db.collection("Employees").find().toArray();
        res.status(200).json(result);
      }


      client.close();
    } catch (error) {
      console.error("GET /api/employees/employeesinfo Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  if (method === "PUT") {
    try {
      const client = await connectToDatabase();
      const db = client.db("test");

      if (Array.isArray(req.body.updates)) {
        // Bulk update
        console.log("Bulk update operations:", req.body.updates);
        const bulkOperations = req.body.updates.map((update) => ({
          updateOne: {
            filter: { employeeID: update.employeeID },
            update: {
              $set: update.updates.$set || {},
              $push: update.updates.$push || {},
            },
          },
        }));

        const result = await db
          .collection("Employees")
          .bulkWrite(bulkOperations);

        client.close();

        if (result.matchedCount === 0) {
          res.status(404).json({ message: "Employees not found" });
        } else if (result.modifiedCount === 0) {
          res.status(200).json({ message: "No changes made" });
        } else {
          res.status(200).json({ message: "Employees updated successfully" });
        }
      } else {
        // Single update
        const { employeeID, updates } = req.body;

        console.log(`Single update for employeeID: ${employeeID}`, updates);

        const filter = { employeeID: employeeID };
        const updateDoc = {
          $set: updates,
        };

        const result = await db
          .collection("Employees")
          .updateOne(filter, updateDoc);

        client.close();

        if (result.matchedCount === 0) {
          res.status(404).json({ message: "Employee not found" });
        } else if (result.modifiedCount === 0) {
          res.status(200).json({ message: "No changes made" });
        } else {
          res.status(200).json({ message: "Employee updated successfully" });
        }
      }
    } catch (error) {
      console.error("PUT /api/employees/employeesinfo Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  if (method === "DELETE") {
    const { employeeID } = req.body;
    console.log(`DELETE /api/employees/employeesinfo - employeeID: ${employeeID}`);

    try {
      const client = await connectToDatabase();
      const db = client.db("test");

      const result = await db
        .collection("Employees")
        .deleteOne({ employeeID: employeeID });

      client.close();

      if (result.deletedCount === 0) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.status(200).json({ message: "Employee deleted successfully" });
      }
    } catch (error) {
      console.error("DELETE /api/employees/employeesinfo Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
}

export default handleEmployeesDB;
