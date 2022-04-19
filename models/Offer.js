const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://joeyindaclouds:qvn5AuEmefU@cluster0.rotgl.mongodb.net/test"); 

const Offer = mongoose.model("Offer", {
    product_name: String,
    product_description: String,
    product_price: Number,
    product_details: Array,
    product_image: { type: mongoose.Schema.Types.Mixed, default: {} },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });
  
  module.exports = Offer;
