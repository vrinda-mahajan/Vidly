const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minLength: 3 },
    phone: { type: String, required: true, minLength: 3 },
  })
);

const validatingRequestBody = (body) => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
  });
  return schema.validate(body);
};

exports.Customer = Customer;
exports.validate = validatingRequestBody;
