const mongoose = require("mongoose");

const feedingRecordSchema = new mongoose.Schema(
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

    foodName: {
      type: String,
      required: true,
    },

    mealType: {
      type: String,
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
      ],
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    feedingDate: {
      type: Date,
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
  "FeedingRecord",
  feedingRecordSchema
);