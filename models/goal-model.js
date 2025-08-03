const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  userId: {
    type: String, 
    required: true
  },
  goalName: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
  },
  status: {
  type: String,
  enum: ["In Progress", "Completed"],
  default: "In Progress"
},
  description: String,

  contributions: [
    {
      amount: Number,
      date: { type: Date, default: Date.now },
      note: String,
      transactionId: String
    }
  ]
});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
