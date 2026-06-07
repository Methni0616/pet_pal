const express = require("express");
const router = express.Router();

const Pet = require("../models/Pet");

// Test Route
router.get("/test", (req, res) => {
  console.log("🔥 TEST ROUTE HIT");
  res.send("Pet route working");
});

// Get All Pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Pet
router.post("/add", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;