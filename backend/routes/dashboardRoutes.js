const express = require("express");
const router = express.Router();

const Pet = require("../models/Pet");
const Vaccination = require("../models/Vaccination");
const WeightRecord = require("../models/WeightRecord");
const Medication = require("../models/Medication");
const VetVisit = require("../models/VetVisit");
const FeedingRecord = require("../models/FeedingRecord");
const HealthRecord = require("../models/HealthRecord");

router.get("/:petId", async (req, res) => {
  try {
    const { petId } = req.params;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    const [
      vaccinations,
      weights,
      medications,
      vetVisits,
      feedings,
      healthRecords,
    ] = await Promise.all([
      Vaccination.find({ petId }),
      WeightRecord.find({ petId }),
      Medication.find({ petId }),
      VetVisit.find({ petId }),
      FeedingRecord.find({ petId }),
      HealthRecord.find({ petId }),
    ]);

    const latestWeight =
      weights.length > 0
        ? weights[weights.length - 1].weight
        : "N/A";

    const healthScore = Math.min(
      100,
      vaccinations.length * 10 +
        medications.length * 5 +
        vetVisits.length * 10 +
        feedings.length * 3
    );

    res.json({
      pet,

      stats: {
        vaccinations: vaccinations.length,
        weights: weights.length,
        medications: medications.length,
        vetVisits: vetVisits.length,
        feedings: feedings.length,
        healthRecords:
          healthRecords.length,
      },

      latestWeight,

      healthScore,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;