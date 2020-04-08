const mongoose = require("mongoose");

const schema = mongoose.Schema;

const registerUser = new schema({
  _id: mongoose.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.model("register", registerUser);
