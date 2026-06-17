const mongoose = require("mongoose");

const vetVisitSchema = new mongoose.Schema(
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

    vetName: {
      type: String,
      required: true,
    },

    clinicName: {
      type: String,
      required: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    diagnosis: {
      type: String,
      required: true,
    },

    treatment: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "VetVisit",
  vetVisitSchema
);