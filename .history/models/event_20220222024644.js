const mongoose = require("mongoose");

// creat event schema
const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: {
    default: Date.now,
    type: Date,
  },
  description: String,
  image: String,

  eventType: {
    required: true,
    type: String,
  },

  creator: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      ref: "users",
    },
  },
  going: {
    _id: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      ref: "users",
    },
  },
  not_interested: {
    _id: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      ref: "users",
    },
  },
  interested: {
    _id: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      ref: "users",
    },
  },
});

module.exports = mongoose.model("events", eventSchema);
