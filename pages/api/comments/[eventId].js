function handler(req, res) {
  const { eventId } = req.query;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: "Added comment.", comment: newComment });
    console.log(newComment);
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Sam", text: "Cool Stuff" },
      { id: "c2", name: "Max", text: "Great event" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
