const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const Pet = require("../models/Pet");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "petpal_pets",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// GET ALL PETS
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

// GET USER PETS ONLY
router.get("/my-pets", async (req, res) => {
  try {
    const { ownerId } = req.query;

    const pets = await Pet.find({
      ownerId,
    });

    res.json(pets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET SINGLE PET
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

// ADD PET WITH IMAGE UPLOAD
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const pet = await Pet.create({
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      gender: req.body.gender,

      image: req.file ? req.file.path : "",

      ownerId: req.body.ownerId || null,

      ownerName: req.body.ownerName || "",

      status: "Available",
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE PET
router.delete("/:id", async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);

    res.json({
      message: "Pet deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
