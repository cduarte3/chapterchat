const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const client = new MongoClient(process.env.DATABASE_URL);

router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields: email, password" });
    }
  
    try {
        await client.connect();
        const collection = client.db("chapterchat").collection("users");
        const user = await collection.findOne({ email: email });
        if (user) {
          // Compare hashed password
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            res.status(200).json({ id: user._id });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        } else {
          // If no user is found with the provided email
          res.status(404).json({ message: "User not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
      } finally {
        await client.close();
      }
  });

module.exports = router;