const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, "userName must be more than 3 Char"],
    maxlength: [10, "userName must be less than 10 char"]
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "Client", "Candidate"],
    default: 'Candidate'
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  major: {
    type: String,
  },
},
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
