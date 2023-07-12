require("dotenv").config();
require("express-async-errors");
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
const error = require("./middlewares/error");
const winston = require("winston");
require("./startup/routes")(app);

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

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

app.use(error);
app.get("/", (req, res) => {
  res.send("Welcome to Vidly API services.");
});

const port = process.env.PORT;
app.listen(port, console.log(`Listening on Port ${port}`));
