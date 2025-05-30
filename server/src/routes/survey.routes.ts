const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); // to protect routes

// Apply auth middleware to all survey routes
// router.use(authMiddleware);

router.get("/", surveyController.getSurveys);
router.post("/", surveyController.createSurvey);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);
router.post("/:id/publish", surveyController.publishSurvey);

module.exports = router;
