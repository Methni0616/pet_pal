require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const petRoutes = require("./routes/petRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const activityRoutes = require("./routes/activityRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");
const weightRoutes = require("./routes/weightRoutes");
const medicationRoutes = require("./routes/medicationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("🐾 Pet Pal API Running");
});

// Test Route
app.get("/hello", (req, res) => {
  res.send("Hello from server");
});

// Pet Routes
app.use("/api/pets", petRoutes);

// Adoption Routes
app.use("/api/adoptions", adoptionRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);

// Health Record Routes
app.use("/api/health", healthRoutes);

// Reminder Routes
app.use("/api/reminders", reminderRoutes);

// Activity Routes
app.use("/api/activities", activityRoutes);

// Gallery Routes
app.use("/api/gallery", galleryRoutes);

// Vaccination Routes
app.use("/api/vaccinations", vaccinationRoutes);

// Weight Routes
app.use("/api/weights", weightRoutes);

// Medication Routes
app.use("/api/medications", medicationRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error");
    console.log(err.message);
  });

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
