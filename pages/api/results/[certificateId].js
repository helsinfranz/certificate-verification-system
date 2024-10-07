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
    res.status(402).json({ message: "Certificate Id is required." });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  try {
    const collection = db.collection("students");
    const certificate = await collection.findOne(
      { certificate_id: certificateId.trim() },
      {
        projection: {
          certificate_id: 1,
          name: 1,
          internship_domain: 1,
          start: 1,
          end: 1,
        },
      }
    );

    if (!certificate) {
      return res
        .status(404)
        .json({ message: "certificate not found for this student." });
    }

    res.status(200).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Users." });
  } finally {
    await client.close();
  }
}
