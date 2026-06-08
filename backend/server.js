const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const petRoutes = require("./routes/petRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");

require("dotenv").config();

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