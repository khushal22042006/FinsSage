const cron = require("node-cron");
const BillReminder = require("../models/bill-model");
const Notification = require("../models/notification-model");
const moment = require("moment");

// Utility to get days between now and due date
const getDaysLeft = (dueDate) => {
  const now = moment();
  const due = moment(dueDate);
  return due.diff(now, "days", true); // allows fractions (e.g., 0.5)
};

const startScheduler = () => {
  console.log("📅 Notification scheduler started...");

  // Runs every 6 hours
  cron.schedule("0 */6 * * *", async () => {
    // 0 */6 * * *
    // * * * * *
    console.log("🔍 Checking for due and repeat reminders...");

    const bills = await BillReminder.find({ isPaid: false });

    for (let bill of bills) {
      const daysLeft = getDaysLeft(bill.dueDate);

      // --- DUE DATE REMINDERS ---
      if ([4, 3, 2, 1].includes(Math.floor(daysLeft)) || daysLeft <= 0.5) {
        const message = `Reminder: '${bill.billName}' is due in ${Math.round(daysLeft * 10) / 10} days.`;

        await Notification.create({
          userId: bill.userId,
          billId: bill._id,
          message,
          type: "DUE_SOON",
        });
      }

      // --- REPEAT REMINDERS ---
      const now = new Date();
      if (bill.repeat !== "None" && bill.dueDate < now) {
        // Send reminder ONLY ONCE
        const existing = await Notification.findOne({
          billId: bill._id,
          type: "REPEAT_REMINDER",
        });

        if (!existing) {
          let nextDue;
          switch (bill.repeat) {
            case "Monthly":
              nextDue = moment(bill.dueDate).add(1, "months");
              break;
            case "Yearly":
              nextDue = moment(bill.dueDate).add(1, "years");
              break;
            case "Weekly":
              nextDue = moment(bill.dueDate).add(1, "weeks");
              break;
          }

          const message = `You might need to pay '${bill.billName}' again. Last due: ${moment(bill.dueDate).format("MMM D")}`;

          await Notification.create({
            userId: bill.userId,
            billId: bill._id,
            message,
            type: "REPEAT_REMINDER",
          });

          // Optionally: Update bill.dueDate = nextDue.toDate()
          // await bill.updateOne({ dueDate: nextDue.toDate() });
        }
      }
    }
  });
};

module.exports = startScheduler;
