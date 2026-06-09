const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
    },

    activityType: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    activityDate: {
      type: Date,
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

module.exports = mongoose.model("Activity", activitySchema);
