const mongoose = require('mongoose');
const schema = mongoose.Schema

//creat post schema
const PostSchema = new schema({
    contant: {
        type: String,
        required: [true, 'contant is required']
    },

    likes: Number
});

const post = mongoose.model("post", PostSchema);
module.exports = post;
