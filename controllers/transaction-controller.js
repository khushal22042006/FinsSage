// controllers/transactionController.js
const Transaction = require('../models/transaction-model');

exports.renderAddForm = (req, res) => {
  res.render('add-transaction', { userId: req.userId });
};

exports.submitTransaction = async (req, res) => {
  const userId = req.userId;
  const { amount, type, category, date, note } = req.body;

  try {
    const tx = new Transaction({ userId, amount, type, category, date, note });
    await tx.save();
    req.flash('success_msg', 'Transaction added successfully');
    res.redirect(`/${userId}/dashboard`);
  } catch (err) {
    console.error('Add transaction error:', err);
    req.flash('error_msg', 'Failed to add transaction');
    res.redirect(`/${userId}/dashboard`);
  }
};
