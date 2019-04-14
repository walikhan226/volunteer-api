const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: String,
    creator: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        },
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts" // it gona be changed to comments but i have now some issue
        }
    ]
});


module.exports = mongoose.model("comments", commentSchema);
