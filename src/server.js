import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import planRoutes from "./routes/planRoutes.js";
import Plan from "./models/planModel.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Travel Planner API");
});

// ✅ Use routes
app.use("/plans", planRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log(" MongoDB connected successfully");

    // 🌍 Add sample data if empty
    const count = await Plan.countDocuments();
    if (count === 0) {
      await Plan.insertMany([
        {
          destination: "Goa",
          startDate: new Date("2025-12-01"),
          endDate: new Date("2025-12-05"),
          activities: ["Beach", "Night Market", "Cruise Party"]
        },
        {
          destination: "Manali",
          startDate: new Date("2026-01-10"),
          endDate: new Date("2026-01-20"),
          activities: ["Skiing", "Hiking", "Cafe hopping"]
        },
        {
          destination: "Paris",
          startDate: new Date("2025-11-20"),
          endDate: new Date("2025-11-30"),
          activities: ["Eiffel Tower", "Louvre Museum", "Boat Ride"]
        }
      ]);
      console.log("🌍 Sample plans added to database!");
    }
  })
  .catch(err => console.error(" MongoDB connection failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
