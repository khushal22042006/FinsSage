const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  billId: {
    type: Schema.Types.ObjectId,
    ref: "BillReminder",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["DUE_SOON", "REPEAT_REMINDER"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
