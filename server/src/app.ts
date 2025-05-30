import express from "express";
import cors from "cors";

const surveyRoutes = require("./routes/survey.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use survey routes
app.use("/api/surveys", surveyRoutes);

export default app;
