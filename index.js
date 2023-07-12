require("dotenv").config();
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/validation")();

app.get("/", (req, res) => {
  res.send("Welcome to Vidly API services.");
});

const port = process.env.PORT;
app.listen(port, console.log(`Listening on Port ${port}`));
