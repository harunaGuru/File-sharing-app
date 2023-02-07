const File = require("../models/files");
require("dotenv").config({ path: "../.env" });
const BASE_URL = process.env.APP_BASE_URL;

module.exports = {
  //* @METHOD: GET
  //* @DESCRIPTION: Display Download Page
  downloadFile: async (req, res) => {
    try {
      const file = await File.findOne({ uuid: req.params.uuid });
      if (!file) {
        res.status(400).render("downloads", { error: "Link expired" });
      }
      res.status(200).render("downloads", {
        uuid: file.uuid,
        fileName: file.fileName,
        fileSize: file.size,
        downloadLink: `${BASE_URL}/api/files/download/${file.uuid}`,
      });
    } catch (error) {
      return res.status(400).render("downloads", { error: error.message });
    }
  },
};
