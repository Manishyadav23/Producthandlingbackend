// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const listingRoutes = require("./routes/listingRoutes");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // serve images statically

// // Routes
// app.use("/api", listingRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const listingRoutes = require('./routes/listingRoutes');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
// Example: serve images from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use listing routes under /api
app.use('/api', listingRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
