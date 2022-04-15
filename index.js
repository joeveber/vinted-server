const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const morgan = require("morgan");


const app = express();
app.use(formidable());
app.use(morgan("tiny"));

mongoose.connect("mongodb+srv://joeyindaclouds:qvn5AuEmefU@cluster0.rotgl.mongodb.net/test"); 

const signUp = require("./routes/signup");
app.use(signUp);

const login = require("./routes/login");
app.use(login);

const publish = require("./routes/publish");
app.use(publish);

const offers = require("./routes/offers");
app.use(offers);


app.all("*", (req, res) => {
    console.log("all routes");
    res.status(400).json({message: "Unauthorized"});
    
 });


app.listen(4000, () => {console.log("Server started")});
