const express = require("express");
const router = express.Router();

const VetVisit = require("../models/VetVisit");

// GET ALL VISITS
router.get("/", async (req, res) => {
  try {
    const visits = await VetVisit.find().sort({
      visitDate: -1,
    });

    res.json(visits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET VISITS BY PET
router.get("/pet/:petId", async (req, res) => {
  try {
    const visits = await VetVisit.find({
      petId: req.params.petId,
    }).sort({
      visitDate: -1,
    });

    res.json(visits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD VISIT
router.post("/", async (req, res) => {
  try {
    const visit = await VetVisit.create(
      req.body
    );

    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE VISIT
router.delete("/:id", async (req, res) => {
  try {
    await VetVisit.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Vet visit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;