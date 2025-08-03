const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
  userId: {
    type: String,  
    required: true
  },
  type: {
    type: String,
    enum: ["Income", "Expense" , "Savings"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    // enum: ["Food" , "Bills" , "travel", "shopping" , "Entertaiment" , "Others" , "Savings"],
    required: true,
  },
  note: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
