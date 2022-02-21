const Event = require("../models/event");
const user = require("../models/user");

//show all event about what user follow have some problem
exports.get_all_events = (req, res, next) => {
  const userId = req.query.id;
  user
    .findOne({ _id: userId })
    .populate({
      // get following events
      path: "following",
      populate: {
        path: "event",
      },
    })
    .exec()
    .then((result) => {
      let resd = [];
      resd[0] = result;
      let red = resd.map((object) => {
        console.log(object.following[0].event);
        return {
          eventsOfFollowing: object.following[0].event,
        };
      });
      res.status(200).json({ red });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//show single event
exports.show_event = (req, res, next) => {
  const eventId = req.query.eventId;
  Event.findOne({ _id: eventId })
    .populate("creator", "name _id", user)
    .then((result) => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// get my events
exports.myEvent = (req, res, next) => {
  const userId = req.query.id;
  user
    .findOne({ _id: userId })
    .populate("event", "name location description date image")
    .exec()
    .then((result) => {
      console.log(result), res.status(200).json({ events: result.event });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//create new event
exports.create_new_event = (req, res, next) => {
  if (!req.body.id) {
    return res.status(401).json({
      error: "invalid params",
    });
  }
  const event = new Event({
    name: req.body.name,
    location: req.body.location,
    //date: req.body.date,
    description: req.body.description,
    creator: req.body.id,
    image: req.body.image,
  });
  user
    .findOne({ _id: req.body.id })
    .exec()
    .then((result) => {
      if (user === "Volunteer") {
        next();
        return res.status(401).json({ error: "You are not a creator" });
      }
      event.eventType = result.usertype;
      event.creator = result;
      event.save();
      result.event.push(event);
      result.save();
      console.log("done");
      next();
      res.status(200).json({ event });
    })
    .catch((err) => {
      console.log(err);
      next();
      res.status(500).json({ error: err });
    });
};

// update event
exports.event_edit = (req, res, next) => {
  const eventId = req.body.eventId;
  const userId = req.body.id;
  Event.findOne({ _id: eventId })
    .then((result) => {
      if (userId == result.creator._id) {
        Event.findOneAndUpdate({ _id: eventId }, req.body).exec();
        Event.findOne({ _id: eventId }).then((doc) => {
          console.log(doc);
          res.status(200).json({ doc });
        });
      } else {
        res.status(401).json({ message: "you can't do update this event" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//delete event
exports.event_delete = (req, res, next) => {
  const eventId = req.body.eventId;
  const userId = req.body.id;
  Event.findOne({ _id: eventId })
    .then((result) => {
      if (userId == result.creator._id) {
        Event.findOneAndDelete({ _id: eventId }).then(() => {
          console.log(" the event deleted");
          res.status(200).json({ message: "the event deleted successfully" });
        });
      } else {
        res.status(401).json({ message: "you can't delete this event" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//Going
exports.going = (req, res, next) => {
  userId = req.body.id;
  eventId = req.body.eventId;
  Event.findOne({ _id: eventId }).then((result) => {
    if (result.not_interested.indexOf(userId) !== -1) {
      result.not_interested.remove(userId);
      console.log("you are in notinterested");
      result.save();
    }
  });
  Event.findOne({ _id: eventId }).then((result) => {
    if (result.interested.indexOf(userId) !== -1) {
      result.interested.remove(userId);
      console.log("you are in interested");
      result.save();
    }
  });
  Event.findOne({ _id: eventId })
    .then((result) => {
      if (result.going.indexOf(userId) === -1) {
        result.going.push(userId);
        result.save();
        console.log(result);
      }
    })
    .then(() => res.status(200).json({ message: "it done" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//Not Interested
exports.not_interested = (req, res, next) => {
  userId = req.body.id;
  eventId = req.body.eventId;
  Event.findOne({ _id: eventId }).then((result) => {
    if (result.going.indexOf(userId) !== -1) {
      result.going.remove(userId);
      console.log("you are in going ");
      result.save();
    }
  });
  Event.findOne({ _id: eventId }).then((result) => {
    if (result.interested.indexOf(userId) !== -1) {
      result.interested.remove(userId);
      console.log("you are in interested");
      result.save();
    }
  });
  Event.findOne({ _id: eventId })
    .then((result) => {
      if (result.not_interested.indexOf(userId) === -1) {
        result.not_interested.push(userId);
        result.save();
        console.log(result);
      }
    })
    .then(() => res.status(200).json({ message: "it done" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//Interested
exports.interested = (req, res, next) => {
  userId = req.body.id;
  eventId = req.body.eventId;
  Event.findOne({ _id: eventId }).then((result) => {
    if (result.going.indexOf(userId) !== -1) {
      result.going.remove(userId);
      result.save();
      console.log("you are in going");
    }
  });
  Event.findOne({ _id: eventId }).then((result) => {
    if (result.not_interested.indexOf(userId) !== -1) {
      result.not_interested.remove(userId);
      result.save();
      console.log("you are in not interested");
    }
  });
  Event.findOne({ _id: eventId })
    .then((result) => {
      if (result.interested.indexOf(userId) === -1) {
        result.interested.push(userId);
        result.save();
      }
    })
    .then(() => res.status(200).json({ message: "it done" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//show going list
exports.get_going = (req, res, next) => {
  const eventId = req.query.eventId;
  Event.findOne({ _id: eventId })
    .populate("going", "name avatar")
    .then((result) => {
      console.log(result.going);
      res.status(200).json({ going: result.going });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//show interested list
exports.get_interested = (req, res, next) => {
  const eventId = req.query.eventId;
  Event.findOne({ _id: eventId })
    .populate("interested", "name avatar")
    .then((result) => {
      console.log(result.interested);
      res.status(200).json({ interested: result.interested });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//show notinterested list
exports.get_not_interested = (req, res, next) => {
  const eventId = req.query.eventId;
  Event.findOne({ _id: eventId })
    .populate("not_interested", "name avatar")
    .then((result) => {
      console.log(result.not_interested);
      res.status(200).json({ not_interested: result.not_interested });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
