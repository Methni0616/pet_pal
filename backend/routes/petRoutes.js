const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// Get All Pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({
      status: "Available",
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Pet
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Add Pet
router.post("/add", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
