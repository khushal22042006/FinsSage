const Goal = require('../models/bill-model');

exports.renderAddForm = (req, res) => {
  res.render('add-bill.ejs', { userId: req.userId });
};

exports.submitbill = async (req, res) => {
  const userId = req.userId;
  const { goalName , billName ,amount ,  dueDate, repeat, isPaid } = req.body;

  try {
    const tx = new Goal({ userId,  billName ,amount ,  dueDate, repeat, isPaid });
    await tx.save();
    req.flash('success_msg', 'Bill added successfully');
    res.redirect(`/${userId}/dashboard`); 
  } catch (err) {
    console.error('Add gill error:', err);
    req.flash('error_msg', 'Failed to add bill');
    res.redirect(`/${userId}/dashboard`);
  }
};
