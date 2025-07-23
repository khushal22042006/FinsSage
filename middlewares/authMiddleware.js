const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.flash("error_msg", "Please log in first");
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to req
    next();
  } catch (err) {
    req.flash("error_msg", "Invalid or expired session. Please log in again.");
    res.redirect("/");
  }
};

module.exports = verifyToken;