const Feedback = require('../models/Feedback');

exports.renderForm = (req, res) => {
  res.render('feedback');
};

exports.submitFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    // Redirect or show a success message
    res.send('<h1>Thank you for your feedback!</h1><a href="/">Back to Home</a>');
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).send('An error occurred while submitting your feedback.');
  }
};
