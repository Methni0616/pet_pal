const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },

    petName: {
      type: String,
      required: true,
    },

    medicineName: {
      type: String,
      required: true,
    },

    dosage: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    instructions: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Medication",
  medicationSchema
);