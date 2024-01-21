const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

// POST endpoint to submit feedback
router.post('/feedback', authMiddleware, feedbackController.submitFeedback);

// GET endpoint to retrieve feedback for a specific project
router.get('/feedback/:projectId', authMiddleware, feedbackController.getFeedbackByProject);

module.exports = router;