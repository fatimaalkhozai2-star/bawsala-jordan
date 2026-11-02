
require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");

const destinationRoutes = require("./routes/destinationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const tripRoutes = require("./routes/tripRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");

const { protect, adminOnly } = require("./middleware/authMiddleware");
const cors = require("cors");

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins
}));

// API Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

// Admin Test Route
app.get("/api/auth/admin-test", protect, adminOnly, (req, res) => {
  res.status(200).json({
    message: "Welcome Admin!"
  });
});

// Home Route
app.get("/", (req, res) => {
  res.send("welcome to Bawsala Jordan");
});

// Protected Route
app.get("/api/auth/protected", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    user: req.user
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
// Start server first
app.listen(PORT, () => {
  console.log(`Bawsala Jordan server is running on port ${PORT}`);

  connectDB();
});