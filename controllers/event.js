const Event = require("../models/event");
const user = require('../models/user');


//show all event about what user follow have some problem
// it not represent what needed
exports.get_all_events = (req, res, next) => {
    const userId = req.body.id
    user.findOne({ _id: userId })
        .populate({
            // get following events
            path: "following",
            populate: {
                path: "event"
            }
        })
        .populate("event")
        .exec()
        .then(result => {
            console.log(typeof (result.following));

            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//show single event
exports.show_event = (req, res, next) => {
    const eventId = req.body.eventId
    Event.findOne({ _id: eventId })
        .populate("creator", "name _id", user)
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
        creator: req.body.id
    })
    user.findOne({ _id: req.body.id })
        .exec()
        .then(result => {
            event.creator = result;
            event.save();
            result.event.push(event);
            result.save();
            console.log("done");
            res.status(200).json({ event });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}


// update event 
exports.event_edit = (req, res, next) => {
    const eventId = req.body.eventId;
    const userId = req.body.id;
    Event.findOne({ _id: eventId })
        .then(result => {
            if (userId == result.creator._id) {
                Event.findOneAndUpdate({ _id: eventId }, req.body)
                    .exec()
                Event.findOne({ _id: eventId })
                    .then(doc => {
                        console.log(doc);
                        res.status(200).json({ doc });
                    })
            } else {
                res.status(401).json({ message: "you can't do update this event" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//delete event 
exports.event_delete = (req, res, next) => {
    const eventId = req.body.eventId;
    const userId = req.body.id;
    Event.findOne({ _id: eventId })
        .then(result => {
            if (userId == result.creator._id) {
                Event.findOneAndDelete({ _id: eventId })
                    .then(() => {
                        console.log(" the event deleted");
                        res.status(200).json({ message: "the event deleted successfully" });
                    })
            } else {
                res.status(401).json({ message: "you can't delete this event" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}
// until now there is noError all work great test 8/4/2019
// some problem in view all events as we need keep search for solution (get_all_event) start from line 7