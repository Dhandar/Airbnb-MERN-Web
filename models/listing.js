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
    image :{
        filename: {
            type: String,
            default: "listingimage",
        },

        url: {
            type: String,
            default:
            "https://unsplash.com/photos/sea-turtle-rests-on-sandy-ocean-floor-near-coral-0dyI8zdsDpU",
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