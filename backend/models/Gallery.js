const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
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

module.exports = mongoose.model("Gallery", gallerySchema);
