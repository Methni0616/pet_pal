const express = require("express");
const router = express.Router();

const Activity = require("../models/Activity");


// Get All Activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({
      createdAt: -1,
    });

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Add Activity
router.post("/", async (req, res) => {
  try {
    const activity = new Activity(req.body);

    await activity.save();

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// Delete Activity
router.delete("/:id", async (req, res) => {
  try {
    await Activity.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Activity deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/pet/:petId", async (req, res) => {
  const activities = await Activity.find({
    petId: req.params.petId,
  });

  res.json(activities);
});

module.exports = router;