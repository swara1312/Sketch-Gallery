const express = require("express")
const session = require('express-session');
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const router = require("./routes/router")

const app =express()
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

const DB =process.env.MONGODB_LINK;

mongoose.connect(DB).then(()=>console.log("\nDB connected")).catch((error)=>console.log("error" + error.message))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));

app.use(router)

app.listen(PORT,() =>{
    console.log(`Server started at port : ${PORT}`)
});