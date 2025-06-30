import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("hedron");
    const users = db.collection("users");

    const result = await users.insertOne({ test: "It works!", timestamp: new Date() });

    res.status(200).json({
      ok: true,
      insertedId: result.insertedId
    });
  } catch (err) {
    console.error("DB ERROR:", err);  // 👈 add this!
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}
