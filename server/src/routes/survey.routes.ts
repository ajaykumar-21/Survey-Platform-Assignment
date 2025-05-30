const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");
import { protect } from "../middleware/auth.middleware";

// Apply auth middleware to all survey routes
// router.use(authMiddleware);

router.get("/", protect, surveyController.getSurveys);
router.post("/", protect, surveyController.createSurvey);
router.get("/:id", protect, surveyController.getSurveyById);
router.put("/:id", protect, surveyController.updateSurvey);
router.delete("/:id", protect, surveyController.deleteSurvey);
router.post("/:id/duplicate", protect, surveyController.duplicateSurvey);
router.post("/:id/publish", protect, surveyController.publishSurvey);

export default router;
