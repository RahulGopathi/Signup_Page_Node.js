//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const requests = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var fName = req.body.firstName;
    var sName = req.body.secondName;
    var email = req.body.email;
    var data = {
        members:[
            {
            "email_address": email,
            "status": "subscribed",
            "merge_fields":{
                "FNAME":fName,
                "LNAME":sName
            }
        }
    ]
    };

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    const url = "https://us1.api.mailchimp.com/3.0/lists/"+listId;
    const options = {
        "method":"POST",
        "auth":"Rahul:s69186abf9ce053e58b0853ea04700ea2-us1"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server started at 3000");
});

const listId = "8524e304e4";
