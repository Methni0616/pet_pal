const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    vaccination: {
      type: String,
      required: true,
    },
    nextVetDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
