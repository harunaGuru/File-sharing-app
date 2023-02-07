const express = require("express");
const scheduler = require("node-cron");
const path = require("path");
const connectDB = require("./config/db");
const { fetchAndDeleteData } = require("./services/fileCleaner");
require("dotenv").config();

const PORT = process.env.PORT || 1338;
const app = express();
connectDB();

scheduler.schedule("00 12 * * *", () => fetchAndDeleteData());

// Templating Engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
app.use("/api/files", require("./routes/files"));
app.use("/api/pages", require("./routes/pages"));
app.all("*", (req, res) => {
  return res
    .status(404)
    .sendFile("404.html", { root: path.join(__dirname, "public") });
});

app.listen(PORT, () => {
  console.log("server is running");
});
