const mongoose = require("mongoose");
const Joi = require("joi");

const validatingRequestBody = (name) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string(),
    popularExamples: Joi.array(),
  });
  return schema.validate(name);
};

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["Thriller", "Romance", "Comedy", "Action", "Sci-fi", "Horror"],
    required: true,
    minLength: 3,
  },
  description: { type: String },
  popularExamples: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
    },
    default: undefined,
  },
});
const Genre = mongoose.model("Genre", genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validatingRequestBody;
