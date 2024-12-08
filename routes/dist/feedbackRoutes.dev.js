"use strict";

var express = require('express');

var router = express.Router();

var feedbackController = require('../controllers/feedbackController'); // Render feedback form


router.get('/', feedbackController.renderForm); // Handle form submission

router.post('/', feedbackController.submitFeedback);
module.exports = router;