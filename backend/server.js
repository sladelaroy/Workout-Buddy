import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/users.js";

// ✅ Load environment variables early
dotenv.config();

// ✅ Connect to the database BEFORE starting the server
connectDB();

// ✅ Initialize Express app
const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
  })
);

// ✅ Middleware (placed correctly)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// ✅ Preflight Request Handling
app.options("*", cors());

// ✅ Debugging Middleware (logs incoming requests)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ✅ Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

// ✅ Root Route (for sanity check)
app.get("/", (req, res) => {
  res.send("<h1>Server is working! 🎉</h1>");
});

// ✅ Global Error Handler (prevents server crashes)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
