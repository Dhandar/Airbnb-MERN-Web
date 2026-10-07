const express = require("express") ;
const app = express() ;
const mongoose = require("mongoose") ;
const path = require("path") ;
const methodOverride = require("method-override") ;
const port = 8080 ;
const ejsMate = require("ejs-mate") ;
const ExpressError = require("./utils/ExpressError.js");
const Joi = require('joi');
const flash = require('connect-flash');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js") ;

// Routes - listings route
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js") ;
const userRouter = require("./routes/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust" ;
main()
    .then(() =>{
        console.log("Connected Successfully to DB...!!!");
    })
    .catch((err) =>{
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")) ;
// app.use(express.urlencoded({extended: true})) ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method")) ;
app.engine("ejs",ejsMate) ;
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false ,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000 ,
        httpOnly : true ,
    },
};

app.get("/",(req,res) =>{
    res.send("Hi , I AM Root...!")
});

app.use(session(sessionOptions));
app.use(flash());

// passport initialized
app.use(passport.initialize());
app.use(passport.session()) ;
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // console.log(res.locals.success);    
    res.locals.currUser = req.user ;
    next();
});

// create fakeuser
// app.get("/demouser",async(req,res) =>{
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "delta-student"
//     })
//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

// listing - route
app.use("/listings" , listingRouter);
// review - route
app.use("/listings/:id/reviews",reviewsRouter) ;
// user route
app.use("/",userRouter);


app.use((req,res,next) =>{
    next(new ExpressError(404,"Page Not Found!"));
});



app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs",{ message })
    // res.status(statuscode).send(message);
});

app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
});