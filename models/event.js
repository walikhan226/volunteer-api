const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creat event schema
const eventSchema = new schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    date: {
        type: Number,
        required: [true, 'data is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    }
});
const event = mongoose.model("event", eventSchema);
module.exports = event;