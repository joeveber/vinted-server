const express = require("express");    
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User.js");

router.post("/user/login", async (req,res) => {
    console.log("login route");

    try {
        const doesUserExists = await User.findOne({
            email: req.fields.email
        });

        if(doesUserExists === null) {
           res.status(400).json("User doesn't exist");

        } else {
            const existingUser = await User.findOne({email: req.fields.email})
            const newHash = SHA256(req.fields.password + existingUser.salt).toString(encBase64);

            if (existingUser.hash !== newHash) {
                res.status(400).json("wrong password");
            } else {
                res.json("login successful"); 
            };
        };
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
});

module.exports = router;