const router = require("express").Router();
const fileRouter = require("../controllers/files")

router.post("/upload", fileRouter.uploadFile) 

router.post("/send", fileRouter.sendMail)

router.get("/download/:uuid", fileRouter.downloadFile);


module.exports = router