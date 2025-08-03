const express = require('express');
const app= express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require("./config/mongoose-connection");
const dashboardRouter = require('./routes/dashboardRouter');
const IndexRoute = require("./routes/index");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
const transactionRoutes = require('./routes/transactionRouter');
const goalRouter = require('./routes/goalRouter');
const billRouter =require("./routes/billRouter");
const methodOverride = require('method-override');
const startScheduler = require("./cron/scheduler");
const notificationRouter = require("./routes/notificationRouter");




db(); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(methodOverride('_method'));

// Routes
app.use("/" , IndexRoute);
app.use("/:userId/dashboard", dashboardRouter);
app.use("/user" ,userRouter);
app.use('/:userId/transaction', transactionRoutes);
app.use('/:userId/goal', goalRouter );
app.use('/:userId/bill', billRouter );
app.use("/:userId/notifications", notificationRouter);



startScheduler();



app.listen(8080, () => {
  console.log("server is listening to port 8080");
}); 

