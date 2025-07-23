// controllers/userController.js
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       req.flash("error_msg", "Email already registered");
      return res.redirect("/");
    }

    // Generate UUID and hash password
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      process.env.JWT_SECRET,
       { expiresIn: "3d" } 
    );

    res.cookie("token" ,token ,
        {
    httpOnly: true,           // Cookie not accessible via client JS
    secure: false,            // true in production with HTTPS
    sameSite: "lax",          // CSRF protection
    maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });



   res.redirect(`/${newUser.userId}/dashboard`);
     } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }

};



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "User not found");
     return res.redirect("/");
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
       req.flash("error_msg", "Invalid credentials");
     return res.redirect("/");
    }
    // Generate token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });
 
    res.redirect(`/${user.userId}/dashboard`);
   } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
