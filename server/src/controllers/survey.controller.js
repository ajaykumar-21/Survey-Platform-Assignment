const Survey = require("../models/survey.model");

const userId = "6417e3d2c4a3b4567890abcd"; // replace with a valid ObjectId string or test id
// Get all surveys for a user
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ createdBy: userIduserId });
    res.json({ success: true, data: { surveys } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new survey
exports.createSurvey = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const survey = new Survey({
      title,
      description,
      questions,
      createdBy: userId,
    });
    await survey.save();
    res.status(201).json({ success: true, data: { survey } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findOne({
      _id: req.params.id,
      createdBy: userId,
    });
    if (!survey)
      return res
        .status(404)
        .json({ success: false, message: "Survey not found" });
    res.json({ success: true, data: { survey } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update survey
exports.updateSurvey = async (req, res) => {
  try {
    const { title, description, questions, status } = req.body;
    const survey = await Survey.findOneAndUpdate(
      { _id: req.params.id, createdBy: userId },
      { title, description, questions, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!survey)
      return res
        .status(404)
        .json({ success: false, message: "Survey not found" });
    res.json({ success: true, data: { survey } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete survey
exports.deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findOneAndDelete({
      _id: req.params.id,
      createdBy: userId,
    });
    if (!survey)
      return res
        .status(404)
        .json({ success: false, message: "Survey not found" });
    res.json({ success: true, message: "Survey deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Publish survey (change status to active)
exports.publishSurvey = async (req, res) => {
  try {
    const survey = await Survey.findOneAndUpdate(
      { _id: req.params.id, createdBy: userId },
      { status: "active", updatedAt: Date.now() },
      { new: true }
    );
    if (!survey)
      return res
        .status(404)
        .json({ success: false, message: "Survey not found" });
    res.json({ success: true, data: { survey } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
