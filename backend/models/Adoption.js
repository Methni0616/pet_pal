const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema({
  petId: String,
  petName: String,
  species: String,

  applicantName: String,
  email: String,
  contact: String,
  reason: String,

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Adoption",
  AdoptionSchema
);