require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rental");
const users = require("./routes/users");
const auth = require("./routes/auth");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1/vidly")
  .then(() => console.log("Connected to vidly database!"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/login", auth);

app.get("/", (req, res) => {
  res.send("Welcome to Vidly API services.");
});

const port = process.env.PORT;
app.listen(port, console.log(`Listening on Port ${port}`));
