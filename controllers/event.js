const Event = require("../models/event");
const user = require('../models/user');


//show all event about what user follow
exports.get_all_events = (req, res, next) => {
    user.findOne({ _id: req.params.userId })
        .populate({
            // get following events
            path: "following",
            populate: {
                path: "event"
            }
        })
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//show single event
exports.show_event = (req, res, next) => {
    Event.findOne({ _id: req.params.eventId })
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


// update event 
exports.event_edit = (req, res, next) => {
    const eventId = req.params.eventId;
    const userId = req.params.userId;
    Event.findOne({ _id: eventId })
        .then(result => {
            if (userId == result.creator._id) {
                Event.findOneAndUpdate({ _id: eventId }, req.body)
                .exec()
                Event.findOne({_id:eventId})
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
    const eventId = req.params.eventId;
    const userId = req.params.userId;
    Event.findOne({ _id: eventId })
        .then(result => {
            if (userId == result.creator._id) {
                Event.findOneAndDelete({ _id: eventId })
                    .then(() => {
                        console.log(" the event deleted");
                        res.status(200).json({message:"the event deleted successfully"  });
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