const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billReminderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  repeat: {
    type: String,
    enum: ["Monthly", "Yearly", "Weekly", "None"],
    default: "None",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const BillReminder = mongoose.model("BillReminder", billReminderSchema);
module.exports = BillReminder;
