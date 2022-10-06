const express =require("express");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const homeRouter=require("./routers/homeRouter");
// const popup=require('popups');

const port=process.env.port || 8080;
const app=express();

mongoose.connect('mongodb://localhost:27017/userRegistration',{useNewUrlParser:true});
const db=mongoose.connection;
db.on("error",()=>{console.warn("erron in connection");});
db.once('open',()=>{console.log("Connected");});

app.set('view engine','ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use("/",homeRouter);


app.listen(port)