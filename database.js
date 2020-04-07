// init code

const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

//connection code
mongoose
  .connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true })
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
