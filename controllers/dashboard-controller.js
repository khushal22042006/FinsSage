const User = require("../models/user-model");
const Goal = require("../models/goal-model");
const Bill = require("../models/bill-model");
const Transaction = require("../models/transaction-model");

exports.getDashboard = async (req, res) => {
  const userId = req.userId;
  const { month } = req.query;

  try {
    const user = await User.findOne({ userId }); // Make sure user exists

    if (!user) {
      return res.status(404).send("User not found");
    }

    const goals = await Goal.find({ userId });
    const bills = await Bill.findOne({ userId });

    const selectedMonth = Array.isArray(month)
      ? month[0]
      : month || new Date().toISOString().slice(0, 7);

    const [year, monthNum] = selectedMonth.split("-").map(Number);
    const start = new Date(year, monthNum - 1, 1);
    const end = new Date(year, monthNum, 0, 23, 59, 59, 999);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end },
    });

    const recentTransactions = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end },
    })
      .sort({ date: -1 })
      .limit(3);

    const income = transactions
      .filter((t) => t.type.toLowerCase() === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type.toLowerCase() === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    res.render("dashboard.ejs", {
      user,
      goals,
      bills,
      income,
      expense,
      selectedMonth,
      transactions,         // 🟢 full list of transactions
      transaction: recentTransactions, // 🟢 recent 3
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while loading dashboard.");
  }
};
