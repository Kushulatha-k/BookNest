const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// =============================
// CORS Configuration
// =============================

const allowedOrigins = [
  "http://localhost:5173",
  "https://book-nest-six-topaz.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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

// Root Test Route
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
