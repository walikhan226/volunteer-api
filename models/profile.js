const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creat profile schema
const profileSchema = new schema({
    firstname: {
        type: String,
        required: [true, 'firstname is require']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
    },
    birthdate: {
        type: Number,
        required: [true, 'birthdate is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    }

});
const profile = mongoose.model("profile", profileSchema);
module.exports = profile;