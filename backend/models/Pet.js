const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    species: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
      default: 0,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    image: {
      type: String,
      default: "",
    },

    // Adoption Status
    status: {
      type: String,
      enum: ["Available", "Pending", "Adopted"],
      default: "Available",
    },

    // Pet Description
    description: {
      type: String,
      default: "",
    },

    // Shelter Information
    shelterName: {
      type: String,
      default: "",
    },

    shelterContact: {
      type: String,
      default: "",
    },

    // Owner Information (for Care Module)
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    ownerName: {
      type: String,
      default: "",
    },

    // Care Statistics
    totalActivities: {
      type: Number,
      default: 0,
    },

    totalReminders: {
      type: Number,
      default: 0,
    },

    totalHealthRecords: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pet", petSchema);