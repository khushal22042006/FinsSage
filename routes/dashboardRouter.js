const express = require("express");
const router = express.Router();




router.get("/", async (req, res) => {
  const { userId } = req.params;
  const { month } = req.query;

  res.send("hello this is dashboard");

  // Uncomment this when your models are ready and you're returning real data:
  /*
  try {
    const user = await User.findOne({ _id: userId });
    const goals = await Goal.find({ userId });
    const bills = await Bills.findOne({ userId });

    const selectedMonth = Array.isArray(month) ? month[0] : (month || new Date().toISOString().slice(0, 7));
    const [year, monthNum] = selectedMonth.split("-").map(Number);
    const start = new Date(year, monthNum - 1, 1);
    const end = new Date(year, monthNum, 0, 23, 59, 59, 999);

    const transaction = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end }
    }).sort({ date: -1 }).limit(3);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end }
    });

    const income = transactions
      .filter(t => t.type.toLowerCase() === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type.toLowerCase() === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    res.render("dashboard.ejs", {
      user,
      goals,
      bills,
      income,
      expense,
      selectedMonth,
      transaction
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
  */
});

module.exports = router;
