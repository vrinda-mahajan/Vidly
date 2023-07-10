const Fawn = require("fawn");
const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rentalModel");
const { Customer } = require("../models/customerModel");
const { Movie } = require("../models/movieModel");
const mongoose = require("mongoose");

Fawn.init("mongodb://127.0.0.1/vidly");

router.get("/", async (req, res) => {
  const rental = await Rental.find();
  res.send(rental);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Customer not found!");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Movie not found!");
  console.log(movie);
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in Stock!");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental);  

  //   try {
  //     var task = Fawn.Task();
  //     task.save("rentals", rental)
  //       .update(
  //         "movies",
  //         { _id: movie._id },
  //         {
  //           $inc: { numberInStock: -1 },
  //         }
  //       )
  //       .run();
  //     res.send(rental);
  //   } catch (e) {
  //     console.error("error - ");
  //     console.error(e);
  //     res.status(500).send("something went wrong!");
  //   }
});

module.exports = router;
