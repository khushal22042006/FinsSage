const Bill = require('../models/bill-model');
const User = require("../models/user-model");

exports.renderAddForm = (req, res) => {
  res.render('add-bill.ejs', { userId: req.userId });
};

exports.submitbill = async (req, res) => {
  const userId = req.userId;
  const { goalName , billName ,amount ,  dueDate, repeat, isPaid } = req.body;

  try {
    const tx = new Bill({ userId,  billName ,amount ,  dueDate, repeat, isPaid });
    await tx.save();
    req.flash('success_msg', 'Bill added successfully');
    res.redirect(`/${userId}/dashboard`); 
  } catch (err) {
    console.error('Add gill error:', err);
    req.flash('error_msg', 'Failed to add bill');
    res.redirect(`/${userId}/dashboard`);
  }
};

exports.getAllbill = async (req, res) => {
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

    const bills = await Bill.find({
      userId,
       dueDate: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.render("all-bills.ejs", {
      user,
      selectedMonth,
      bills,         
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while loading dashboard.");
  }
};

exports.getEditBill = async (req, res) => {
  const { billId } = req.params;
  const userId = req.userId; 
  try {
    const bill = await Bill.findOne({ _id: billId, userId });

    if (!bill) {
      return res.status(404).send("bill not found or unauthorized");
    }

    res.render('edit-bill', {
      userId,
      bill
    });

  } catch (error) {
    console.error("Error loading transaction for editing:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatebill = async (req, res) => {
  const { userId, billId } = req.params;

  const {  billName ,amount ,  dueDate , repeat, isPaid } = req.body;


  try {
    const bill = await Bill.findOneAndUpdate(
      { _id: billId, userId }, // ensure only user's own bill is updated
      {
        userId,  billName ,amount ,  dueDate :new Date(dueDate), repeat, isPaid
      },
      { new: true }
    );

    if (!bill) {
      return res.status(404).send("bill not found or unauthorized");
    }

    res.redirect(`/${userId}/bill/all`);
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).send("Internal Server Error");
  }
};


exports.deletebill = async (req, res) => {
    const { userId, billId } = req.params;

    try{
 const bill = await Bill.findOneAndDelete({
      _id: billId,
      userId: userId
    });

      if (!bill) {
      return res.status(404).send("bill not found or unauthorized");
    }

    res.redirect(`/${userId}/bill/all`);

    }catch(error){
      console.error("Error deleting bill:", error);
    res.status(500).send("Internal Server Error");
    }

};








