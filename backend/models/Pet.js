const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  gender: String,
  image: String,

  status: {
    type: String,
    default: "Available",
  },
});

module.exports = mongoose.model(
  "Pet",
  petSchema
);