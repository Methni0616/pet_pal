const express = require("express");
const router = express.Router();

const Reminder = require("../models/Reminder");


// GET ALL REMINDERS
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({
      createdAt: -1,
    });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ADD REMINDER
router.post("/", async (req, res) => {
  try {
    const reminder = new Reminder(req.body);

    await reminder.save();

    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// UPDATE REMINDER
router.put("/:id", async (req, res) => {
  try {
    const updatedReminder =
      await Reminder.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedReminder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE REMINDER
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Reminder deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/pet/:petId", async (req, res) => {
  const reminders = await Reminder.find({
    petId: req.params.petId,
  });

  res.json(reminders);
});

module.exports = router;