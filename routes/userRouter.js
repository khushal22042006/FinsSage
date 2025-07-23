const express = require("express");
const router = express.Router();
const { registerUser , loginUser} = require("../controllers/userController");
const validate = require("../middlewares/validate");
const Joi = require("joi");

// Joi schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Test route
router.get("/", (req, res) => {
  res.send("User route working");
});

// Register route with Joi middleware
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);


router.get("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the JWT cookie
  req.session.destroy(() => {
    res.redirect("/"); // Redirect to homepage (index)
  });
});
module.exports = router;
