const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

// Retrieve analytics data
router.get('/analytics', authMiddleware, analyticsController.getAnalyticsData);

module.exports = router;