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
        }
    ]
});


module.exports = mongoose.model("comments", commentSchema);
