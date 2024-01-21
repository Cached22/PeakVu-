const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const subscriptionController = require('../controllers/subscriptionController');

// Create a new subscription for financing
router.post('/create-subscription', authMiddleware, subscriptionController.createSubscription);

// Get subscription details for a user
router.get('/subscriptions/:userId', authMiddleware, subscriptionController.getSubscriptionsByUser);

module.exports = router;