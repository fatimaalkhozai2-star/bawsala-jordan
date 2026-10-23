
const express = require("express");
const app = express();

const connectDB = require("./config/db");
const destinationRoutes = require("./routes/destinationRoutes");

app.use(express.json());
app.use("/api/destinations", destinationRoutes);
app.get("/test", (req, res) => {
  res.send("Test route works!");
});
const PORT = 5000;

app.get("/", (req, res) => {
     res.send("welcome to Bawsala Jordan");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Bawsala Jordan server is running on port ${PORT}`);
  });
};

startServer();
