const express = require("express");

const router = express.Router();

const WeightRecord = require("../models/WeightRecord");

// GET ALL WEIGHTS
router.get("/", async (req, res) => {
  try {
    const records = await WeightRecord.find().sort({
      recordDate: 1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET WEIGHTS FOR A PET
router.get("/pet/:petId", async (req, res) => {
  try {
    const records = await WeightRecord.find({
      petId: req.params.petId,
    }).sort({
      recordDate: 1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD WEIGHT RECORD
router.post("/", async (req, res) => {
  try {
    const record = await WeightRecord.create(req.body);

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE WEIGHT RECORD
router.delete("/:id", async (req, res) => {
  try {
    await WeightRecord.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Weight record deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;