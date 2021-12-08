const express = require("express");
const controller = require("../controllers/movies.controller");

const router = express.Router();

router.get("/list", controller.getMovies);

router.get("/:id", controller.getMovieById);

router.post("/add", controller.postMovie);

router.put("/edit/:id", controller.putMovie);

router.delete("/delete/:id", controller.deleteMovie);

module.exports = router;
