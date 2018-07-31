"use strict";

var express = require("express");
var router = express.Router();

//child routes of /questions
router.get("/", (req, res)=>{
    // return all questions
    res.json({response: "You sent me a GET request"});
});

router.post("/", (req, res)=>{
    // create question
    res.json({response: "You sent me a POST request"});
});

router.get("/:qid", (req, res)=>{
    // return the question with specified id

    var obj = asdasd.auefiahf;
    res.json({response: "You sent me a GET request for the question with id " + req.params.qid});
});

router.post("/:qid/answers", (req, res)=>{
    // create answer
    res.json({
        response: "You sent me a POST request to /answers",
        questionId: req.params.qid,
        body: req.body
    });
});

router.put("/:qid/answers/:aid", (req, res)=>{
    // edit answer
    res.json({
        response: "You sent me a PUT request to /answers",
        questionId: req.params.qid,
        answerId: req.params.aid,
        body: req.body
    });
});

router.delete("/:qid/answers/:aid", (req, res)=>{
    // delete answer
    res.json({
        response: "You sent me a DELETE request to /answers",
        questionId: req.params.qid,
        answerId: req.params.aid
    });
});

router.post("/:qid/answers/:aid/vote-:dir", 

(req, res, next)=>{
    if(req.params.dir.search(/^(up|down)$/) === -1){
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    }
    else{
        next();
    }
},

(req, res)=>{
    // vote for answer
    res.json({
        response: "You sent me a POST request to /vote-" + req.params.dir,
        questionId: req.params.qid,
        answerId: req.params.aid,
        vote: req.params.dir,
        body: req.body
    });
});

module.exports = router;