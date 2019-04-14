const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true

    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        }
    ],

    event: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events"     // it point to collection
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "users"
        }
    ],
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "users"
        }
    ],
    avatar: String
});
module.exports = mongoose.model('users', userSchema);