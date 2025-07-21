const express = require('express');
const app= express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require("./config/mongoose-connection");
const dashboardRouter = require('./routes/dashboardRouter');

db(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// Routes
app.use("/:userId/dashboard", dashboardRouter);


app.get("/", (req, res) => {
  res.send("hey");
});


app.listen(8080, () => {
  console.log("server is listening to port 8080");
}); 

