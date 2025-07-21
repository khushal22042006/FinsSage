const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(`${config.get("MONGODB_URI")}/FinSage`);
    dbgr("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

module.exports = connectDB;
