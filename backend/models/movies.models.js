const mongoose = require("mongoose");

const movieModel = new mongoose.Schema({
  name: { type: "string", required: true },
  image: { type: "string", required: true },
  gender: { type: "string", required: true },
  director: { type: "string", required: true },
  score: { type: "string", required: true },
  isWatched: { type: "boolean", default: false },
});

const Movie = mongoose.model("Movies", movieModel);

module.exports = Movie;
