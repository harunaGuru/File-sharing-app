const File = require("../models/files");
require("dotenv").config({ path: "../.env" });
const fs = require("fs");

let fetchAndDeleteData = async () => {
  try {
    const files = await File.find({
      createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    if (files.lenth) {
      try {
        for (const file of files) {
          fs.unlinkSync("../" + file.path);
          await file.remove();
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = {fetchAndDeleteData}