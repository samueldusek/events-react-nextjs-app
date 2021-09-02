import { MongoClient } from "mongodb";

async function handler(req, res) {
  const { eventId } = req.query;

  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
    console.log(newComment);
  }
  if (req.method === "GET") {
    const comments = await db
      .collection("comments")
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: comments });
  }

  client.close();
}

export default handler;
