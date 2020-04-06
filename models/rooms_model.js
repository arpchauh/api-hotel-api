const mongoose = require("mongoose");

//hotel-description schema
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  image: {
    type: String,
    required: true
  },

  Room: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  Contact: {
    type: Number,
    required: true
  }
});

mongoose.model("hotel", hotelSchema);
