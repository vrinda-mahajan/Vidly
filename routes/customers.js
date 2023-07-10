const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customerModel");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById({ _id: req.params.id });
  res.send(customer);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);
  const newCustomer = new Customer(req.body);
  const customer = await newCustomer.save();
  res.send(customer);
});
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(customer);
  if (!customer) return res.status(404).send("Customer not found!");
  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Customer not found!");
  res.send(customer);
});

module.exports = router;
