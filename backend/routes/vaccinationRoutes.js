const express = require("express");
const router = express.Router();

const Vaccination = require("../models/Vaccination");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const vaccinations = await Vaccination.find().sort({
      nextDueDate: 1,
    });

    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET BY PET
router.get("/pet/:petId", async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({
      petId: req.params.petId,
    }).sort({
      nextDueDate: 1,
    });

    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD
router.post("/", async (req, res) => {
  try {
    const vaccination = await Vaccination.create(req.body);

    res.status(201).json(vaccination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const updated = await Vaccination.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Vaccination.findByIdAndDelete(req.params.id);

    res.json({
      message: "Vaccination deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;