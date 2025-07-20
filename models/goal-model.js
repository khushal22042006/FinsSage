const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
