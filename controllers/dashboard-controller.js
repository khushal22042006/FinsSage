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
  req.flash("error_msg", "User not found");
  return res.redirect("/");
}

    const goals = await Goal.find({ userId });
    const bills = await Bill.find({ userId });

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

      // Step 1: Generate last 4 months labels and summary
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const now = new Date();

const barChartData = {
  labels: [],
  incomeData: [],
  expenseData: []
};

for (let i = 3; i >= 0; i--) {
  const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
  const year = date.getFullYear();
  const month = date.getMonth();

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

  const monthlyTransactions = await Transaction.find({
    userId,
    date: { $gte: start, $lte: end },
  });

  const income = monthlyTransactions
    .filter((t) => t.type.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = monthlyTransactions
    .filter((t) => t.type.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  barChartData.labels.push(monthNames[month]);
  barChartData.incomeData.push(income);
  barChartData.expenseData.push(expense);
}

      // Calculate category totals for Expenses only
const categoryTotals = {};

transactions.forEach((t) => {
  if (t.type.toLowerCase() === "expense") {
    const category = t.category;
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += t.amount;
  }
});

// Prepare data for Chart.js pie chart
const categoryChartData = {
  labels: Object.keys(categoryTotals),
  data: Object.values(categoryTotals),
};

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
      transactions,         
      transaction: recentTransactions, 
      categoryChartData,
       barChartData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while loading dashboard.");
  }
};
