const express = require("express") ;
const router = express.Router() ;
const wrapAsync = require("../utils/wrapAsync.js") ;
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema , reviewSchema } = require("../schema.js")
const Listing  = require("../models/listing.js") ;
const  { isLoggedIn } = require("../middleware.js") ;


// Validation for listing 
const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body) ;
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",") ; 
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


// Index Route
router.get(
    "/",
    wrapAsync(async(req,res) =>{
    const allListings =  await Listing.find({});
    // const allListings = await Listing.find({});
    console.log(allListings[0].image.url);
    res.render("listings/index.ejs",{allListings}) ;

}));


// CREATE(new & create route ) - New Route
router.get("/new",isLoggedIn ,(req,res) =>{
    // console.log(req.user);
    res.render("listings/new.ejs")
});

// Show Route(READ)
router.get(
    "/:id",
    wrapAsync(async(req,res) =>{
    let {id} = req.params ;
    const listing = await Listing.findById(id).populate("reviews") ;
    if(!listing){
        req.flash("error" ,"Listing you requested does not exits!!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing })
}));

// Create Route 
router.post(
    "/",
    isLoggedIn ,
    validateListing , 
    wrapAsync(async(req,res,next) =>{
        let result = listingSchema.validate(req.body) ;
        console.log(result) ;
        if(result.error){
            throw new ExpressError(400,result.error);
        }
        const  newListing = new Listing(req.body.listing) ;
        await newListing.save();
        req.flash("success" ,"New Listing created!!");
        res.redirect("/Listings") ;
    })
);

// Edit Route
router.get(
    "/:id/edit",
    isLoggedIn ,
    wrapAsync(async(req,res) =>{
    let { id } = req.params ;
    const listing = await Listing.findById(id) ;
    if(!listing){
        req.flash("error" ,"Listing you requested does not exits!!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing}) ;
}));

// Update route
router.put(
    "/:id",
    isLoggedIn ,
    validateListing ,
    wrapAsync(async(req,res) =>{
    let {id} = req.params ;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})  ;
    req.flash("success" ,"Listing Updeted!!");

    res.redirect(`/Listings/${id}`) ;
})) ;

// Delete Route
router.delete(
    "/:id" , 
    isLoggedIn ,
    wrapAsync(async(req,res) =>{
    let { id } = req.params ;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing) ;
    req.flash("success" ,"Listing Deleted!!");
    res.redirect("/Listings") ;
}));


//  export route 
module.exports = router ;