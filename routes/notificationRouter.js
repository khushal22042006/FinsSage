const express = require("express");
const router = express.Router({ mergeParams: true }); // 🔥 This is the key fix!
const Notification = require("../models/notification-model");

router.get("/", async (req, res) => {
  try {
    const userId =  req.params.userId;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .populate("billId");

    res.render("notifications.ejs", { notifications , userId });
  } catch (err) {
    res.status(500).send("Error loading notifications");
  }
});

module.exports = router;
