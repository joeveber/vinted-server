const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://joeyindaclouds:qvn5AuEmefU@cluster0.rotgl.mongodb.net/test"); 

const User = mongoose.model("User", {
    account: {username: String},
    email: String,
    newsletter: Boolean,
    token: String,
    hash: String,
    salt: String,
  });

  module.exports = User;
