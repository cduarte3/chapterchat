const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URL);

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("chapterchat").collection("users");
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    await client.close();
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Missing required fields: email, password" });
  }

  const date = new Date();

  try {
    await client.connect();
    const collection = client.db("chapterchat").collection("users");
    const result = await collection.insertOne({
      email,
      password
    });

    // Fetch the inserted document using the insertedId
    const insertedDocument = await collection.findOne({
      _id: result.insertedId,
    });

    res.status(201).json(insertedDocument);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
