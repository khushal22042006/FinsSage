const express = require("express");
const router = express.Router({ mergeParams: true });

const dashboardController = require("../controllers/dashboard-controller");
const verifyToken = require("../middlewares/verifyToken");

// Protected route to render dashboard
router.get("/", verifyToken, dashboardController.getDashboard);

module.exports = router;
