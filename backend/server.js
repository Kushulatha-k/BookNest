const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// =============================
// Middleware
// =============================

// Enable CORS for all origins (for deployment)
app.use(
  cors({
    origin: "*",
  })
);

// Parse JSON body
app.use(express.json());

// =============================
// Routes
// =============================

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 BookNest Backend Running...");
});

// =============================
// Start Server (Dynamic PORT)
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
