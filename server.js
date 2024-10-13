const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");
const menuRoutes = require("./api/menuRoutes");
const orderRoutes = require("./api/orderRoutes"); // Import the new routes
const dbURI = process.env.MONGO_URI;

const app = express();
app.use(cors());

// For parsing JSON responses
app.use(express.json());

// MongoDB connection
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic route
app.get("/", (req, res) => {
  res.send("The Venue API is running...");
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes); // Add new route

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
