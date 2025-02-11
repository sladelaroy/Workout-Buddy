import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
// ✅ Ensure JSON middleware is after CORS setup
app.use(express.json());
// ✅ Enable CORS for all origins
app.use(cors());

// ✅ Debugging middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ✅ Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Server is working! 🎉</h1>");
});

// ✅ Global error handler (prevents crashes without CORS headers)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// ✅ Start server
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 5000}`
  );
});
