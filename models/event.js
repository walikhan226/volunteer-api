const mongoose = require('mongoose');

// creat event schema
const eventSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    date: {
        type: String,
        required: [true, 'data is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    creator: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }
});

module.exports = mongoose.model("events", eventSchema);