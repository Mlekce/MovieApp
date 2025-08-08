const controller = require("../controllers/search");
const express = require("express");
const router = express.Router();

router.get("/api/search?q=matrix", controller.queryDatabase);
router.get("/api/tmdb/:title", controller.movieMetaData);

module.exports = router;
