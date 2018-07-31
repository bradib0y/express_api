'use strict';
// import & init
var express = require("express");
var app = express();
var routes = require("./router.js");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

// third party middleware
app.use(logger("dev"));
app.use(jsonParser()); // this will parse the request body to json, and make it available from the request object under body property

// custom middleware
app.use("/questions", routes);

app.use((req, res, next)=>{
    console.dir(req.body);
    console.log("*****");
    console.log(req.body.color || "There is no color");
    return next();
});

app.use("/different", (req, res, next)=>{
    
    for(var prop in req.query){
        console.log(prop + " is: "+ req.query[prop]);
    }
    console.log("Second middleware");
    return next();
});

// error handling middleware

app.use((req, res, next)=>{
    // if no route were triggered, create an error
    var err = new Error("Not found");
    err.status = 404;
    console.log("11111");
    next(err);
}    
);

app.use((err, req, res, next)=>{
    // catch the error from any middleware function
    console.log("22222");
    res.status(err.status || 500);
    res.json(
        {error: {message: err.message}}
    );
}

);


// use production environment port, or 3000 in development
var port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log("Running");})