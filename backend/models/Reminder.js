const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Reminder", reminderSchema);
