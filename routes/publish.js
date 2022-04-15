const express = require("express");    
const router = express.Router();

const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: "dnhmaqdjr",
  api_key: "445914567143873",
  api_secret: "B62VWHY9Gq6Lr0FEfY8BQEx79Cc"
});


const Offer = require("../models/Offer.js");

const isAuthenticated = require("../middlewares/isAuthenticated");

///
router.post("/offer/publish", isAuthenticated, async (req,res) => {
    console.log("publish route");

    try {

      const upload = await cloudinary.uploader.upload(req.files.picture.path, {
        folder: "winter/offers",
        public_id : `${req.fields.title}`
    });

        const newOffer = await new Offer({
            
            product_name: req.fields.title,
            product_description: req.fields.description,
            product_price: req.fields.price,
            product_details: [
                {MARQUE: req.fields.brand},
                {TAILLE: req.fields.size},
                {ÉTAT: req.fields.condition},
                {COULEUR:req.fields.color},
                {EMPLACEMENT:req.fields.city}
            ],
                
            product_image: {
              secure_url: upload.secure_url,
            },
            owner: req.user._id,
              
        });
        
        
        await newOffer.save();
      
res.json({
    product_name: req.fields.title,
    product_description: req.fields.description,
    product_price: req.fields.price,
    product_details: [
      { MARQUE: req.fields.brand },
      { TAILLE: req.fields.size },
      { ÉTAT: req.fields.condition },
      { COULEUR: req.fields.color },
      { EMPLACEMENT: req.fields.city },
    ],
    product_image: {
      secure_url: upload.secure_url,
    },
    owner: req.user,
  });

    } catch (error) {
        res.status(400).json({ error: error.message });
    };
});

///








module.exports = router;