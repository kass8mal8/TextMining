const { Router } = require("express");
const { uploadDocument } = require("../controllers/document");
const router = new Router();

router.post("/upload", uploadDocument);

module.exports = router;
