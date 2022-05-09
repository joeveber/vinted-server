const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Offer = require("../models/Offer.js");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  console.log("publish route");
  const { title, description, price, brand, size, condition, color, city } =
    req.fields;
  console.log("check1");
  try {
    const upload = await cloudinary.uploader.upload(req.files.picture.path, {
      folder: "offers",
      public_id: `${title}`,
    });
    console.log("check2");
    const newOffer = await new Offer({
      product_name: title,
      product_description: description,
      product_price: price,
      product_details: [
        { MARQUE: brand },
        { TAILLE: size },
        { ÉTAT: condition },
        { COULEUR: color },
        { EMPLACEMENT: city },
      ],

      product_image: {
        secure_url: upload.secure_url,
      },
      owner: req.user._id,
    });
    console.log("check3");
    await newOffer.save();

    res.json({
      product_name: title,
      product_description: description,
      product_price: price,
      product_details: [
        { MARQUE: brand },
        { TAILLE: size },
        { ÉTAT: condition },
        { COULEUR: color },
        { EMPLACEMENT: city },
      ],
      product_image: {
        secure_url: upload.secure_url,
      },
      owner: req.user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
