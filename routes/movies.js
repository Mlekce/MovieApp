const controller = require("../controllers/movies");
const express = require("express");
const router = express.Router();

router.get("/api/movies", controller.showAllMovies);
router.get("/api/movies/:id", controller.showMovieDetails);
router.get("/api/movies/:id/stream", controller.streamMovie);

router.post("/api/movies/scan", controller.scanAndAddMovies);

router.delete("/api/movies/:id", controller.deleteMovie);

module.exports = router;
