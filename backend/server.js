

require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./config/db");
const destinationRoutes = require("./routes/destinationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const tripRoutes = require("./routes/tripRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use("/api/destinations", destinationRoutes);
app.use("/api/categories", categoryRoutes);
app.get("/test", (req, res) => {
  res.send("Test route works!");
});
app.use("/api/favorites", favoriteRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);
const PORT = 5000;

app.get("/", (req, res) => {
     res.send("welcome to Bawsala Jordan");
});

const { protect } = require("./middleware/authMiddleware");

app.get("/api/auth/protected", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    user: req.user
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Bawsala Jordan server is running on port ${PORT}`);
  });
};

startServer();
