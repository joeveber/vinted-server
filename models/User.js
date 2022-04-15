const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vinted"); 

const User = mongoose.model("User", {
    account: {username: String},
    email: String,
    newsletter: Boolean,
    token: String,
    hash: String,
    salt: String,
  });

  module.exports = User;