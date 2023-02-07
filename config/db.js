const mongoose = require("mongoose");
require("dotenv").config;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, MONGO_OPTIONS);
    console.log("connected to DB 😅😄😃");
  } catch (error) {
    console.log("Could not connect to MongoDB 😣😣😏");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
