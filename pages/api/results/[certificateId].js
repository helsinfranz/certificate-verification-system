import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(401).json({ message: "Not authorized!" });
    return;
  }

  const { certificateId } = req.query;

  if (
    !certificateId ||
    certificateId.length === 0 ||
    certificateId.trim().length === 0
  ) {
    res.status(402).json({ message: "Student Id is required." });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  try {
    const collection = db.collection("students");
    const marks = await collection.findOne(
      { student_id: certificateId.trim() },
      {
        projection: {
          student_id: 1,
          assessment_marks: 1,
          attendance_marks: 1,
          linkedin_post_marks: 1,
          project_review_marks: 1,
          project_submission_marks: 1,
          // total: {
          //   $add: [
          //     "$assessment_marks",
          //     "$attendance_marks",
          //     "$linkedin_post_marks",
          //     "$project_review_marks",
          //     "$project_submission_marks",
          //   ],
          // },
        },
      }
    );

    if (!marks) {
      return res
        .status(404)
        .json({ message: "Marks not found for this student." });
    }

    const totalMarks = [
      marks.assessment_marks,
      marks.attendance_marks,
      marks.linkedin_post_marks,
      marks.project_review_marks,
      marks.project_submission_marks,
    ].reduce((total, mark) => total + (parseFloat(mark) || 0), 0);

    const result = {
      total: totalMarks.toFixed(2),
      ...marks,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Users." });
  } finally {
    await client.close();
  }
}
