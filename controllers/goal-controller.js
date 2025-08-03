const Goal = require('../models/goal-model');
const User = require("../models/user-model");



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

exports.getGoalDetails = async (req, res) => {
 const { userId, goalId } = req.params;
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

    
     const goal = await Goal.findOne({
      _id: goalId,
      userId: userId
    });

      if (!goal) {
      return res.status(404).send("goal not found or unauthorized");
    }

  // Chart Data:  contributions with labels and cumulative data
    const sortedContributions = goal.contributions.sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartLabels = sortedContributions.map(c => {
      const d = new Date(c.date);
      return `${d.getDate()}/${d.getMonth() + 1}`; // e.g., "30/07"
    });

    let cumulative = 0;
    const chartData = sortedContributions.map(c => {
      cumulative += c.amount;
      return cumulative;
    });


    res.render("goal-details.ejs", {
      user,
      selectedMonth,
      goal, 
      chartLabels,
      chartData        
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while loading dashboard.");
  }
};




