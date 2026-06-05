const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const listingsSchema = new Schema({
    title :{
        type : String ,
        required : true,
    },
    description :{
        type : String ,
    },
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
            set: (v) => v === "" 
                ? "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60" 
                : v,
        },
    },
    price :{
        type : Number,
    },
    location :{
        type : String,
    },
    country :{
        type : String,
    }
});

const Listing = mongoose.model("Listing",listingsSchema) ;
module.exports = Listing;