const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // load .env variables

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
      req.flash("error_msg", "you have to login");
     return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach custom userId to request
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.redirect("/");
  }
};

module.exports = verifyToken;