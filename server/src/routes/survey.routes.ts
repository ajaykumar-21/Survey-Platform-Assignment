const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");
import { protect } from "../middleware/auth.middleware";

// Apply auth middleware to all survey routes
// router.use(authMiddleware);

router.get("/", protect, surveyController.getSurveys);
router.post("/", protect, surveyController.createSurvey);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);
router.post("/:id/publish", surveyController.publishSurvey);

export default router;
