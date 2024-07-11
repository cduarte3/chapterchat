require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const { router: loginRoute, isAuthenticated } = require("./routes/login");

const client = new MongoClient(process.env.DATABASE_URL);

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

function authCheck(req, res, next) {
  const PUBLIC_PATHS = ["/", "/login", "/signup"];
  const path = req.path;
  if (!isAuthenticated(req) && !PUBLIC_PATHS.includes(path)) {
    return res
      .status(404)
      .json({ message: "You are not authorized to access this page" });
  }
  next();
}

app.use(authCheck);

app.use("/users", require("./routes/users"));
app.use("/login", loginRoute);
app.use("/signup", require("./routes/signup"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
