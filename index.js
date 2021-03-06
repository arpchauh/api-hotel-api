const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./database");

console.log(port);

//middleware setup
app.use(morgan("dev"));
app.use(cors());

const rooms = require("./routes/rooms");
const registerUser = require("./routes/register");
//default routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ name: "working" });
});

app.use("/api/hotel", rooms);
app.use("/user", registerUser);
app.use("/uploads", express.static("uploads"));

//start server
app.listen(port, function () {
  console.log("Server running at port : " + port);
});
