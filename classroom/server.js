const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session") ;
const flash = require("connect-flash");
const path = require("path");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")) ;

const sessionOptions = {
    secret : "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res) =>{
    let {name = "anonamous"} = req.query ;
    req.session.name = name ;
    console.log(req.session.name);
    // res.send(name) ;
    if(name === "anonamous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res,next) =>{
    res.locals.successMsg = req.flash(("success"));
    res.locals.errorMsg = req.flash(("error"));
    res.render("page.ejs",{name : req.session.name , });
    next();
}) ;

// app.get("/reqcount",(req,res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1 ;
//     }
//     res.send(`you send a request ${req.session.count} times`)
// });


// app.get("/test",(req,res) =>{
//     res.send("test successful!");
// });






// app.use(cookieParser("secretCode"));

// app.get("/getsignedcookie",(req,res) =>{
//     res.cookie("madeIn" ,"India" , {signed : true});
//     res.send("signed Cookies send") ;
// });

// app.get("/verify",(req,res) =>{
//     res.send((req.signedCookies));
// });

// app.get("/getcookie" ,(req,res) =>{
//     res.cookie("greet","hello");
//     res.cookie("madeIn","india");
//     res.send("Send you some cookies");
// });

// app.get("/" ,(req,res) =>{
//     res.send("hi , i am root ");
// }) ;

// app.use("/users",users);
// app.use("/",posts);

app.listen(3000 , () =>{
    console.log(`Server is listing on port 3000`);
});  