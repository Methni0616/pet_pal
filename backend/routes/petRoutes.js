const express = require("express");
const router = express.Router();

const Pet = require("../models/Pet");


// ===================================
// GET ALL PETS
// ===================================
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();

    res.json(pets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ===================================
// GET AVAILABLE PETS ONLY
// ===================================
router.get("/available", async (req, res) => {
  try {
    const pets = await Pet.find({
      status: "Available",
    });

    res.json(pets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ===================================
// GET SINGLE PET
// ===================================
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(
      req.params.id
    );

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


// ===================================
// ADD PET
// ===================================
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


// ===================================
// UPDATE PET
// ===================================
router.put("/:id", async (req, res) => {
  try {
    const updatedPet =
      await Pet.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedPet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ===================================
// DELETE PET
// ===================================
router.delete("/:id", async (req, res) => {
  try {
    const deletedPet =
      await Pet.findByIdAndDelete(
        req.params.id
      );

    if (!deletedPet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    res.json({
      message: "Pet deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ===================================
// ASSIGN PET TO OWNER
// AFTER ADOPTION
// ===================================
router.put(
  "/adopt/:id",
  async (req, res) => {
    try {
      const pet =
        await Pet.findById(
          req.params.id
        );

      if (!pet) {
        return res.status(404).json({
          message: "Pet not found",
        });
      }

      pet.ownerId =
        req.body.ownerId;

      pet.ownerName =
        req.body.ownerName;

      pet.status = "Adopted";

      await pet.save();

      res.json(pet);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
