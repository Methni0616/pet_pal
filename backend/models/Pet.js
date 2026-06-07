const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  gender: String,
  image: String,
});

module.exports = mongoose.model("Pet", petSchema);