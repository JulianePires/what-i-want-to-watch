const moviesService = require("../services/movies.service");

const getMovies = async (req, res) => {
  await moviesService
    .getMoviesService()
    .then((movies) => {
      if (movies.length === 0) {
        res.status(204).json(movies);
      }
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status();
    });
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  await moviesService
    .getMovieByIdService(id)
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(404).send({
        message: "Movie cannot be found",
      });
    });
};

const postMovie = async (req, res) => {
  if (
    !req.body ||
    !req.body.name ||
    !req.body.image ||
    !req.body.gender ||
    !req.body.director ||
    !req.body.score
  ) {
    res.status(400).send({
      message: "Name, image, gender, director and score are required",
    });
    return;
  }

  const newMovie = req.body;

  await moviesService
    .registerMovie(newMovie)
    .then(() => {
      res.status(200).send({ message: "Movie created successfully" });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

const putMovie = async (req, res) => {
  if (
    !req.body ||
    !req.body.name ||
    !req.body.image ||
    !req.body.gender ||
    !req.body.director ||
    !req.body.score
  ) {
    res.status(400).send({
      message: "You have to fill all required fields",
    });
    return;
  }

  const { id } = req.params;
  const movieNewInfo = req.body;

  await moviesService
    .updateMovie(id, movieNewInfo)
    .then(() => {
      res.status(200).send({ message: "Movie updated successfully" });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

const modifyIsWatchStatus = async (req, res) => {
  const { id } = req.params;
  const { isWatched } = req.body;
  await moviesService
    .updateWatchedStatus(id, isWatched)
    .then(() => {
      res.status(200).send({ message: "Status updated successfully" });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  await moviesService
    .deleteMovie(id)
    .then(() => {
      res.status(200).send({ message: "Movie deleted successfully" });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  putMovie,
  modifyIsWatchStatus,
  deleteMovie,
};
