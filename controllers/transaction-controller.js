// controllers/transactionController.js
const Transaction = require('../models/transaction-model');
const User = require("../models/user-model");


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

exports.getAlltransaction = async (req, res) => {
  const userId = req.userId;
  const { month } = req.query;

  try {
    const user = await User.findOne({ userId }); // Make sure user exists

   if (!user) {
  req.flash("error_msg", "User not found");
  return res.redirect("/");
}


    const selectedMonth = Array.isArray(month)
      ? month[0]
      : month || new Date().toISOString().slice(0, 7);

    const [year, monthNum] = selectedMonth.split("-").map(Number);
    const start = new Date(year, monthNum - 1, 1);
    const end = new Date(year, monthNum, 0, 23, 59, 59, 999);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });





    res.render("all-transaction.ejs", {
      user,
      selectedMonth,
      transactions,         
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while loading dashboard.");
  }
};


exports.getEditTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.userId; 
  try {
    const transaction = await Transaction.findOne({ _id: transactionId, userId });

    if (!transaction) {
      return res.status(404).send("Transaction not found or unauthorized");
    }

    res.render('edit-transaction', {
      userId,
      transaction
    });

  } catch (error) {
    console.error("Error loading transaction for editing:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateTransaction = async (req, res) => {
  const { userId, transactionId } = req.params;

  const { amount, type, category, date, note } = req.body;

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, userId }, // ensure only user's own transaction is updated
      {
        amount,
        type,
        category,
        date: new Date(date),
        note
      },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).send("Transaction not found or unauthorized");
    }

    res.redirect(`/${userId}/transaction/all`);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteTransaction = async (req, res) => {
    const { userId, transactionId } = req.params;

    try{
 const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId: userId
    });

      if (!transaction) {
      return res.status(404).send("Transaction not found or unauthorized");
    }

    res.redirect(`/${userId}/transaction/all`);

    }catch(error){
      console.error("Error deleting transaction:", error);
    res.status(500).send("Internal Server Error");
    }

};
