const mongoose = require("mongoose");

//connection code
mongoose
  .connect("mongodb://arpit:arpit123@ds127139.mlab.com:27139/malvan_hotel", {
    useNewUrlParser: true
  })
  .then(console.log("Mongoose connected"))
  .catch(error => {
    console.log(error);
  });
