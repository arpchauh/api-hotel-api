// init code

const mongoose = require("mongoose");
const assert = require("assert");
const db_url = process.env.DB_URL;

//connection code
mongoose
  .connect(db_url, { useNewUrlParser: true })
  .then(console.log("Mongoose connected"))
  .catch(error => {
    console.log(error);
  });
let db = mongoose.connection;

db.once("open", function() {
  console.log("Connected to MongoDB");
});

db.on("error", function(err) {
  console.log(err);
});
