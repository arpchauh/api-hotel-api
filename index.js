const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = PROCESS.ENV || 3000;
const database = require("./database");

console.log(port);

//middleware setup
app.use(morgan("dev"));
app.use(cors());

const rooms = require("./routes/rooms");
//default routes

app.get("/", (req, res) => {
  res.render("Hello Working.......");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/hotel", rooms);
app.use("/uploads", express.static("uploads"));

//start server
app.listen(port, function() {
  console.log("Server running at port : " + port);
});
