const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// Healthcheck cho Product API
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.use("/products", productRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Product API running on port ${PORT}`);
});