const Router = require("express").Router();

const MovieModel = require("../../Database/movie");



Router.post("/create/mov", async (req, res) => {
  try {
    const newMovie = req.body.newMovie;
    const addNewMovie = await MovieModel.create(newMovie);

    return res.json({ Movies: addNewMovie, message: "Movie is added" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

Router.get("/get/movie", async (req, res) => {
  const getAllMovies = await MovieModel.find();
  return res.json({ Movies: getAllMovies });
});

Router.put("/update/:movie_id", async (req, res) => {
  const updateMovie = await MovieModel.findOneAndUpdate(
    {
      movie_id: req.params.movie_id,
    },
    {
      title: req.body.movieTitle,
    }
  );
  return res.json({ Movie: updateMovie, message: "Movie's title updated" });
});


Router.delete("/delete/:movie_id", async (req, res) => {
  const deleteMovie = await MovieModel.findOneAndDelete({
    movie_id: req.params.movie_id,
  });

  return res.json({ movie: deleteMovie, message: "Movie deleted" });
});

module.exports = Router;
