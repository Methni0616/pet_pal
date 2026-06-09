const express = require("express");
const router = express.Router();

const HealthRecord = require("../models/HealthRecord");


// GET ALL
router.get("/", async (req, res) => {
  try {
    const records = await HealthRecord.find().sort({
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
    const record = new HealthRecord(req.body);

    await record.save();

    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await HealthRecord.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Record deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated =
      await HealthRecord.findByIdAndUpdate(
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

router.get("/pet/:petId", async (req, res) => {
  try {
    const records = await HealthRecord.find({
      petId: req.params.petId,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;