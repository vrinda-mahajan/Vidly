const express = require("express");
const { validate, Movie } = require("../models/movieModel");
const { Genre } = require("../models/genreModel");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  console.log(movie);
  res.send(movie);
});
router.put("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  if (!movie) return res.status(400).send("Movie not found!");
  console.log(movie);
  res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("Movie not found!");
  res.send(movie);
});

module.exports = router;
