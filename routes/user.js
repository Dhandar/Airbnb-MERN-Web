const express = require("express") ;
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const { trusted } = require("mongoose");
const passport = require("passport");

router.get("/signup",(req,res) =>{
    res.render("users/signup.ejs");
});


router.post("/signup",
    wrapAsync(async(req,res) =>{
        try{
            let {username , email , password} = req.body ;
            const newUser = new User({email,username});
            const registeredUSer = await User.register(newUser,password) ;
            console.log(registeredUSer);
            req.flash("success","Welcome to WanderLust!!");
            res.redirect("/listings");
        }catch(err){
            req.flash("error",err.message);
            res.redirect("/signup");
        }
}));

router.get("/login",(req,res) =>{
    res.render("users/login.ejs");
});

router.post("/login",
    passport.authenticate("local",{
        failureRedirect : '/login',
        failureFlash : true
    }),
    async(req,res) =>{
        req.flash("success","Welcome back to WanderLust!");
        res.redirect("/listings");
    }
);

router.get("/logout",(req,res,next) =>{
    req.logOut((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
})


module.exports = router ;

