const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /materials
// @desc    Fetch current material prices
// @access  Private
router.get('/materials', authMiddleware, quoteController.getMaterialPrices);

// @route   POST /quote
// @desc    Generate a quote based on provided details
// @access  Private
router.post('/quote', authMiddleware, quoteController.createQuote);

module.exports = router;