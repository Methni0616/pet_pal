
const express = require("express");
const router = express.Router();

const Adoption = require("../models/Adoption");


// Add Adoption
router.post("/", async (req, res) => {
  try {
    const adoption = new Adoption(req.body);

    await adoption.save();

    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Get All Adoptions
router.get("/", async (req, res) => {
  try {
    const adoptions = await Adoption.find();

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;