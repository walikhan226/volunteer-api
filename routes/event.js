const express = require('express');
const router = express.Router();
const EventController = require("../controllers/event");
const checkAuth = require('../middleware/check-auth');

//get method about show all event in database
router.get('/events', checkAuth, EventController.get_all_events);
//get method about show single event
router.get("/events/single", checkAuth, EventController.show_event);
//post method about make new event
router.post("/events/new", checkAuth, EventController.create_new_event);
//put method about update exist event
router.put("/events/single/edit", checkAuth, EventController.event_edit);
//delete method about delete event
router.delete("/events/single/delete", checkAuth, EventController.event_delete);

module.exports = router
// all done  (search for solution for line 7) test json to know where the issue