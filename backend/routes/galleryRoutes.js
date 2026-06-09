const express = require("express");
const router = express.Router();

const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const Gallery = require("../models/Gallery");

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "petpal_gallery",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
});

// GET ALL PHOTOS
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json(photos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPLOAD PHOTO
router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {
      const photo =
        await Gallery.create({
          petId: req.body.petId,

          petName:
            req.body.petName,

          imageUrl: req.file.path,

          publicId:
            req.file.filename,
        });

      res.status(201).json(
        photo
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// DELETE PHOTO
router.delete("/:id", async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    await cloudinary.uploader.destroy(photo.publicId);

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      message: "Photo deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/pet/:petId", async (req, res) => {
  const photos = await Gallery.find({
    petId: req.params.petId,
  });

  res.json(photos);
});

module.exports = router;
