const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    image: String,
    creator: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts" // it gona be changed to comments but i have now some issue
        }
    ]
});


module.exports = mongoose.model("posts", PostSchema);
