"use strict";

var Feedback = require('../models/Feedback');

exports.renderForm = function (req, res) {
  res.render('feedback');
};

exports.submitFeedback = function _callee(req, res) {
  var _req$body, name, email, message, feedback;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, message = _req$body.message;
          _context.prev = 1;
          feedback = new Feedback({
            name: name,
            email: email,
            message: message
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(feedback.save());

        case 5:
          // Redirect or show a success message
          res.send('<h1>Thank you for your feedback!</h1><a href="/">Back to Home</a>');
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error('Error submitting feedback:', _context.t0);
          res.status(500).send('An error occurred while submitting your feedback.');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};