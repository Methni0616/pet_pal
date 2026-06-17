const express = require("express");
const router = express.Router();

const Medication = require("../models/Medication");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const records = await Medication.find().sort({
      createdAt: -1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET BY PET
router.get("/pet/:petId", async (req, res) => {
  try {
    const records = await Medication.find({
      petId: req.params.petId,
    }).sort({
      createdAt: -1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD
router.post("/", async (req, res) => {
  try {
    const medication = await Medication.create(
      req.body
    );

    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  try {
    const updated =
      await Medication.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
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
    await Medication.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Medication deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;