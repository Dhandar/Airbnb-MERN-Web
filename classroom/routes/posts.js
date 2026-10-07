const express = require("express");
const router = express.Router() ;


// posts
// index 
router.get("/posts",(req,res) =>{
    res.send("GET for posts");
});

// show users
router.get("/posts/:id",(req,res) =>{
    res.send("GET Show posts ID");
});

// post
router.post("/posts" , (req,res) =>{
    res.send("POST for posts");
});
// delete - users
router.delete("/posts/:id",(req,res) =>{
    res.send("DELETE for posts ID");
}); 


module.exports = router;