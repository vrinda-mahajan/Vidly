const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genreModel");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const createGenre = async (body) => {
  try {
    const genre = new Genre(body);
    const result = await genre.save();
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const getGenre = async (id) => {
  const result = await Genre.find({ id: id }).select({
    name: 1,
    description: 1,
    popularExamples: 1,
  });
  console.log(result);
  return result;
};

const updateGenre = async (id, body) => {
  console.log("id", id);
  const result = await Genre.findByIdAndUpdate(id, body);
  console.log(result);
  return result;
};

const deleteGenre = async (id) => {
  const result = await Genre.findByIdAndRemove(id);
  console.log("Delete", result);
  return result;
};

router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
  } catch (ex) {
    next(ex)
  }
});

router.get("/:id", async (req, res) => {
  const genre = await getGenre(req.params.id);
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await createGenre(req.body);
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await updateGenre(req.params.id, req.body);
  if (!genre) return res.status(404).send("Genre not found!");
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await deleteGenre(req.params.id);
  console.log(genre);
  if (!genre) return res.status(404).send("Genre Id does not exists!");
  res.send(genre);
});

module.exports = router;
