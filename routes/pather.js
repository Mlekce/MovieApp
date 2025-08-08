const express = require("express");
const router = express.Router();

const controller = require("../controllers/settings");

router.post("/api/folder", controller.setMovieFolderPath);

module.exports = router;