import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import surveyRoutes from "./routes/survey.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // or your frontend URL
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use auth and survey routes
app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);

export default app;
