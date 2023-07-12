const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1/vidly")
    .then(() => console.log("Connected to vidly database!"));
};
