const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/ahttps://images.unsplash.com/photo-1718809070481-a16828fbb61d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D-person-swimming-in-the-ocean-with-a-camera-NhWxAIs61MM",
        set: (v)=> v===""
        ?"https://unsplash.com/photos/a-https://images.unsplash.com/photo-1718809070481-a16828fbb61d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D-swimming-in-the-ocean-with-a-camera-NhWxAIs61MM"
        :v,
    },
    price:Number,
    location:String,
    country:String,
    reviews :[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({reviews:{$in: listing.reviews}});
    }     
});

const Listing=mongoose.model("Listing", listingSchema);
module.exports = Listing;