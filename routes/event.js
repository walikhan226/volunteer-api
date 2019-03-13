const express = require('express');
const router = express.Router();
const EventController = require("../controllers/event");
const checkAuth = require('../middleware/check-auth');

//get method about show all event in database
router.get('/events',checkAuth,EventController.get_all_events);
//get method about show single event
router.get("/events/:eventId",checkAuth,EventController.show_event);
//post method about make new event
router.post("/:userId/events/new",checkAuth,EventController.create_new_event);
//put method about update exist event
router.put("/events/:eventId/edit",checkAuth,EventController.event_edit);
//delete method about delete event
router.delete("/events/:eventId/delete",checkAuth,EventController.event_delete);

module.exports = router