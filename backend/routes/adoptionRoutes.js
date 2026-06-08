const express = require("express");
const router = express.Router();

const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");


// Create Adoption
router.post("/", async (req, res) => {
  try {

    const existingRequest =
      await Adoption.findOne({
        petId: req.body.petId,
        userId: req.body.userId,
      });

    if (existingRequest) {
      return res.status(400).json({
        message:
          "You have already applied for this pet",
      });
    }

    const adoption = new Adoption(
      req.body
    );

    await adoption.save();

    res.status(201).json(
      adoption
    );

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});


// Get All Adoptions
router.get("/", async (req, res) => {
  try {
    const adoptions =
      await Adoption.find();

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});


// Get Current User Adoptions
router.get(
  "/user/:id",
  async (req, res) => {
    try {
      const adoptions =
        await Adoption.find({
          userId:
            req.params.id,
        });

      res.json(adoptions);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// Update Adoption Status
router.put(
  "/:id",
  async (req, res) => {
    try {
      const adoption =
        await Adoption.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      if (
        adoption &&
        req.body.status ===
          "Approved"
      ) {
        const pet =
          await Pet.findById(
            adoption.petId
          );

        if (
          pet &&
          pet.status !==
            "Adopted"
        ) {
          await Pet.findByIdAndUpdate(
            adoption.petId,
            {
              status:
                "Adopted",
            }
          );
        }
      }

      res.json(adoption);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;