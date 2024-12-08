const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Render feedback form
router.get('/', feedbackController.renderForm);

// Handle form submission
router.post('/', feedbackController.submitFeedback);

module.exports = router;
