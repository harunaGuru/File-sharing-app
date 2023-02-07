const upload = require("../config/fileUpload");
const { v4: uuidv4 } = require("uuid");
const File = require("../models/files");
const sendEmail = require("../services/email");
const emailTemplate = require("../utils/emailTemplate");
require("dotenv").config;
const BASE_URL = process.env.APP_BASE_URL;

module.exports = {
  //* @METHOD: POST
  //* @DESCRIPTION: Upload file to server
  uploadFile: (req, res) => {
    upload(req, res, async () => {
      try {
        if (!req.file) {
          return res.status(404).json({
            error: "file not selected",
          });
        }
        // Upload file to db
        const file = new File({
          fileName: req.file.filename,
          uuid: uuidv4(),
          path: req.file.path,
          size: req.file.size,
        });
        const savedFile = await file.save();
        return res.status(200).json({
          file: `${BASE_URL}/api/pages/download-page/${savedFile.uuid}`,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
      }
    });
  },

  //* @METHOD: POST,
  //* @DESCRIPTION: Send file through email
  sendMail: async (req, res) => {
    try {
      const { uuid, receiversEmail, sendersEmail } = req.body;
      if (!(uuid && receiversEmail && sendersEmail)) {
        res.status(422).json({
          error:
            "All fields are required - file, receiver's email and sender's email",
        });
      }
      const foundFile = await File.findOne({ uuid });
      foundFile.sender = sendersEmail;
      foundFile.receiver = receiversEmail;
      await sendEmail({
        from: sendersEmail,
        to: receiversEmail,
        subject: "File share with you",
        text: `${sendersEmail} share a file with you`,
        html: emailTemplate({
          emailFrom: sendersEmail,
          downloadLink: `${BASE_URL}/api/files/download/${foundFile.uuid}`,
          size: parseInt(foundFile.size / 1000) + " KB",
          expires: "24 hours",
        }),
      });
      await foundFile.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  },

  //* @METHOD: GET
  //* @DESCRIPTION: Download file from the server
  downloadFile: async (req, res) => {
    try {
      const file = await File.findOne({ uuid: req.params.uuid });

      if (!file)
        return res.status(400).render("downloads", { error: "Link expired" });

      const filePath = `${__dirname}/../${file.path}`;
      console.log(filePath);
      return res.status(200).download(filePath);
    } catch (err) {
      return res.status(400).render("downloads", { error: err });
    }
  },
};
