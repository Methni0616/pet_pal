const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
  petId: String,
  petName: String,
  species: String,

  userId: String,
  userName: String,
  userEmail: String,

  contact: String,
  address: String,
  occupation: String,
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
  adoptionSchema
);