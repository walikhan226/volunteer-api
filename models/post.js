const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    creator: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        name:{
            type:String,
            ref:"users"
        }
    },
    comment: {

       post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts" // it gona be changed to comments but i have now some issue
        },
        name:{
            type:String,
            ref:"users"
        },
        content:{
            type:String,
            ref:"posts"
        }

    }
});


module.exports = mongoose.model("posts", PostSchema);
