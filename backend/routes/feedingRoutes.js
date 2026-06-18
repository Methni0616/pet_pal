const express = require("express");

const router = express.Router();

const FeedingRecord = require("../models/FeedingRecord");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const records =
      await FeedingRecord.find().sort({
        feedingDate: -1,
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
    const records =
      await FeedingRecord.find({
        petId: req.params.petId,
      }).sort({
        feedingDate: -1,
      });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD RECORD
router.post("/", async (req, res) => {
  try {
    const record =
      await FeedingRecord.create(
        req.body
      );

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE RECORD
router.delete("/:id", async (req, res) => {
  try {
    await FeedingRecord.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Feeding record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;