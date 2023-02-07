const router = require("express").Router();
const pageRouter = require("../controllers/pages");

router.get("/download-page/:uuid", pageRouter.downloadFile);

module.exports = router;
