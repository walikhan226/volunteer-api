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
            // it point to collection
            ref: "events"
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
    ]
});
module.exports = mongoose.model('users', userSchema);