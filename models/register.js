const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creat register schema
const registerSchema = new schema({
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
const register = mongoose.model("register", registerSchema);
module.exports = register;