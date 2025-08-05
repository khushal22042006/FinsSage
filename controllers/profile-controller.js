const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.renderProfile = async(req, res) => {
 const userId = req.userId;

  try {
       const user =  await User.findOne({userId :userId});

 if (!user) {
      return res.status(404).send("User not found or unauthorized");
    }

    res.render('profile', {
      userId,
      user
    });
 
   } catch (error) {
     console.error("Error loading user :", error);
     res.status(500).send("Internal Server Error");
   }
};


exports.renderEditProfile= async(req, res) => {
 const userId = req.userId;

  try {
       const user =  await User.findOne({userId :userId});

 if (!user) {
      return res.status(404).send("User not found or unauthorized");
    }

    res.render('update-profile.ejs', {
      userId,
      user
    });
 
   } catch (error) {
     console.error("Error loading user :", error);
     res.status(500).send("Internal Server Error");
   }
};



exports.updateUserProfile = async (req, res) => {
  const { userId, name, email } = req.body;
  const enteredPassword = req.body.password;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      req.flash("error_msg", "User not found.");
      return res.redirect(`/${userId}/edit-profile`);
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    if (!isMatch) {
      req.flash("error_msg", "Incorrect password.");
      return res.redirect(`/${userId}/edit-profile`);
    }

    // Check if email is already used by someone else
    const emailTaken = await User.findOne({ email });
    if (emailTaken && emailTaken.userId !== userId) {
      req.flash("error_msg", "Email already in use.");
      return res.redirect(`/${userId}/edit-profile`);
    }

    user.name = name;
    user.email = email;
    await user.save();

    req.flash("message", "Profile updated successfully.");
    return res.redirect(`/:userId/profile`);

  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).send("Server error.");
  }
};
