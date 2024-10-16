import { connectToDatabase } from "../../../lib/db.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { employeeIDs } = req.body;

    if (!employeeIDs || !Array.isArray(employeeIDs)) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const client = await connectToDatabase();
        const db = client.db("test");

        const busyEmployees = await db
            .collection("Employees")
            .find({ employeeID: { $in: employeeIDs }, activeTask: { $ne: null } })
            .toArray();

        client.close();

        if (busyEmployees.length > 0) {
            const names = busyEmployees.map(emp => `${emp.firstName} ${emp.lastName} (${emp.employeeID})`).join(', ');
            return res.status(400).json({ message: `The following employees are currently busy: ${names}` });
        }

        return res.status(200).json({ message: "All employees are available." });
    } catch (error) {
        console.error("Error verifying employee availability:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
