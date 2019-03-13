const Event = require("../models/event");
const user = require('../models/user');


//show all event
exports.get_all_events = (req, res, next) => {
    Event.find({})
    .populate("creator","name _id",user) // must define model refrance
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


//show single event
exports.show_event = (req, res, next) => {
    Event.findOne({ _id: req.params.eventId })
    .populate("creator","name _id",user) 
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//create new event
exports.create_new_event = (req, res, next) => {
    const event = new Event({
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
        creator: req.params.userId
    })
    user.findOne({ _id: req.params.userId })
        .then(result => {
            event.creator = result;
            event.save();
            result.event.push(event);
            result.save();
            console.log("done");
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}


// updating event not done yet
exports.event_edit = (req, res, next) => {
    Event.findOneAndUpdate({ _id: req.params.eventId }, req.body)
    Event.findOne({ _id: req.params.eventId })
        .then(result => {
            console.log(result);
            res.status(200).json({ result })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//deleting event not done yet
exports.event_delete = (req, res, next) => {
    Event.findOneAndDelete({ _id: req.params.eventId })
        .then(() => {
            console.log("deleted");
            res.status(200).json({ message: "event deleted " });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}