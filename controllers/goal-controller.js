const Goal = require('../models/goal-model');

exports.renderAddForm = (req, res) => {
  res.render('add-goal.ejs', { userId: req.userId });
};

exports.submitGoal = async (req, res) => {
  const userId = req.userId;
  const { goalName , targetAmount,  currentAmount, deadline, status, description} = req.body;

  try {
    const tx = new Goal({ userId, goalName ,targetAmount ,  currentAmount, deadline, status, description });
    await tx.save();
    req.flash('success_msg', 'Goal added successfully');
    res.redirect(`/${userId}/dashboard`); 
  } catch (err) {
    console.error('Add goal error:', err);
    req.flash('error_msg', 'Failed to add goal');
    res.redirect(`/${userId}/dashboard`);
  }
};

