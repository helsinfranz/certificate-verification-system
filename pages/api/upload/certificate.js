import { connectToDatabase } from "@/lib/db";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(401).json({ message: "Not authorized!" });
    return;
  }

  const { data } = req.body;

  if (!data || data.length === 0) {
    res.status(401).json({ message: "No data found in the file." });
    return;
  }

  if (!Array.isArray(data)) {
    res.status(401).json({ message: "Data must be an array." });
    return;
  }

  const trimmedData = [];

  data.map((item, index) => {
    let studentID = item.student_id;
    if (!item.student_id || !item.marks || isNaN(item.marks)) {
      res.status(422).json({
        message: "Error: Invalid data on id: " + item.student_id + ".",
      });
      return;
    }
    if (isNaN(item.student_id)) {
      studentID = item.id.trim();
      if (item.id.trim().length === 0) {
        res.status(422).json({
          message: "Error: Invalid data on id " + item.student_id + ".",
        });
        return;
      }
    }
    trimmedData.push({
      student_id: studentID,
      marks: parseFloat(item.marks).toFixed(2),
    });
  });

  const session = await getToken({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("students");

  try {
    const bulkOperations = trimmedData.map((item) => ({
      updateOne: {
        filter: { student_id: item.student_id.toString() },
        update: {
          $set: {
            student_id: item.student_id.toString(),
            assessment_marks: item.marks,
          },
        },
        upsert: true,
      },
    }));

    await collection.bulkWrite(bulkOperations);

    res.status(200).json({ message: "Assessment Data uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating data" });
  } finally {
    await client.close();
  }
}
