const mongoose = require("mongoose");
const { genreSchema } = require("./genreModel");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 255 },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
  console.log("scemsa");
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;
