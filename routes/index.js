const express = require("express");
const router = express.Router();




router.get("/", async (req, res) => {
  const { userId } = req.params;
  const { month } = req.query;

  res.render("index.ejs");
  
  });

module.exports = router;

