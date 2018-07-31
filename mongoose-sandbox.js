"use strict";

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox", { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", (err)=>{
    console.log("MONGODB SANDBOX ERROR: " + err.message);
});

db.once("open", ()=>{
    console.log("MONGODB CONNECTION SUCCESS");

    // all database communication goes here
    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: String,
        color: String,
        size: String,
        mass: Number,
        name: String
    });
    console.dir(AnimalSchema.obj);
    var Animal = mongoose.model("Animal", AnimalSchema);
    console.dir(Animal);
    var elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawrence"
    });

    elephant.save((err)=>{
        if(err)
        {console.error("Save failed", err);}
        else{console.log("Saved");}
        db.close(()=>{
            console.log("Connection closed");
        });
    });

    db.close();
});