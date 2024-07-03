const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb"); // Corrected here

const client = new MongoClient(process.env.DATABASE_URL);

router.get("/:userid", async (req, res) => {
  const userId = req.params.userid;

  if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
  }

  try {
      await client.connect();
      const collection = client.db("chapterchat").collection("users");
      const user = await collection.findOne({ _id: new ObjectId(userId) }); // Corrected here

      if (user) {
          const { password, ...userWithoutPassword } = user;
          res.status(200).json(userWithoutPassword);
      } else {
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