const Movie = require("../models/movies.models");

const getMoviesService = async () => {
  return await Movie.find({});
};

const getMovieByIdService = async (idParam) => {
  return await Movie.findById(idParam);
};

const registerMovie = async (newMovie) => {
  return await Movie.create(newMovie);
};

const updateMovie = async (movieId, movieNewInfo) => {
  return await Movie.updateOne({ _id: movieId }, movieNewInfo);
};

const updateWatchedStatus = async (movieId, watchedStatus) => {
  return await Movie.findOneAndUpdate(
    { _id: movieId },
    { isWatched: watchedStatus }
  );
};

const deleteMovie = async (movieId) => {
  return await Movie.deleteOne({ _id: movieId });
};

module.exports = {
  getMoviesService,
  getMovieByIdService,
  registerMovie,
  updateMovie,
  updateWatchedStatus,
  deleteMovie,
};
