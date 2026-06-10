const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
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

    vaccineName: {
      type: String,
      required: true,
    },

    dateGiven: {
      type: Date,
      required: true,
    },

    nextDueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Upcoming", "Overdue"],
      default: "Completed",
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
  "Vaccination",
  vaccinationSchema
);