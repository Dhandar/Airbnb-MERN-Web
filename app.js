const express = require("express") ;
const app = express() ;
const mongoose = require("mongoose") ;
const Listing  = require("./models/listing.js") ;
const path = require("path") ;
const methodOverride = require("method-override") ;
const port = 8080 ;
const ejsMate = require("ejs-mate") ;

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
app.use(methodOverride("_method")) ;
app.engine("ejs",ejsMate) ;
app.use(express.static(path.join(__dirname,"/public")))


// app.get("/testlisting",async(req,res) =>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : "1200",
//         location : "Calangute , Goa",
//         country : "India"
//     });

//     await sampleListing.save() ;
//     console.log("Sample Was Saved") ;
//     res.send("Successful Testing.....!!");

// });

app.get("/",(req,res) =>{
    res.send("Hi , I AM Root...!")
});

// Index Route
app.get("/Listings",async(req,res) =>{
    const allListings =  await Listing.find({});
    // const allListings = await Listing.find({});
    console.log(allListings[0].image.url);
    res.render("listings/index.ejs",{allListings}) ;

});


// CREATE(new & create route ) - New Route
app.get("/Listings/new",(req,res) =>{
    res.render("listings/new.ejs")
});

// Show Route(READ)
app.get("/Listings/:id",async(req,res) =>{
    let {id} = req.params ;
    const listing = await Listing.findById(id) ;
    res.render("listings/show.ejs",{ listing })
});

// Create Route 
app.post("/Listings",async(req,res) =>{
    const  newListing = new Listing(req.body.listing) ;
    await newListing.save();
    res.redirect("/Listings") ;

});

// Edit Route
app.get("/Listings/:id/edit",async(req,res) =>{
    let { id } = req.params ;
    const listing = await Listing.findById(id) ;
    res.render("listings/edit.ejs",{listing}) ;
});

// Update route
app.put("/Listings/:id",async(req,res) =>{
    let {id} = req.params ;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})  ;
    res.redirect(`/Listings/${id}`) ;
}) ;

// Delete Route
app.delete("/Listings/:id" , async(req,res) =>{
    let { id } = req.params ;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing) ;
    res.redirect("/Listings") ;

})

app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
});