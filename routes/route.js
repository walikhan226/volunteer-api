const express = require('express');
const router = express.Router();
const post = require('../models/post');
const event = require('../models/event');
const profile = require('../models/profile');
const register = require('../models/register');


//get list of posts
router.get('/posts', (req, res, next) => {
    post.find({}).then(function (posts) {
        res.json(posts);
    });
});


//get list of events
router.get('/events', (req, res, next) => {
    event.find({}).then(function (events) {
        res.json(events);

    });
});

//get list of profiles
router.get('/profiles', (req, res, next) => {
    profile.find({}).then(function (profiles) {
        res.send(profiles);

    });
});

//make a new post
router.post('/post', function (req, res, next) {
    post.create(req.body).then(function (post) {
        res.send(post)
    }).catch(next);
});

//make a new event
router.post('/event', function (req, res, next) {
    event.create(req.body).then(function (event) {
        res.send(event)
    }).catch(next);
});

//make a new account
router.post('/register', function (req, res, next) {
    register.create(req.body).then(function (register) {
        res.send(register)
    }).catch(next);
});


//update post
router.put('/post/:id', function (req, res, next) {
    post.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        post.findOne({ _id: req.params.id }).then(function (post) {
            res.send(post);
            console.log("updated post");
        })
    }).catch(next);
});

//update event
router.put('/event/:id', function (req, res, next) {
    event.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        event.findOne({ _id: req.params.id }).then(function (event) {
            res.send(event);
            console.log("updated event");
        })
    }).catch(next);
});

//update profile information
router.put('/setting/:id', function (req, res, next) {
    profile.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        profile.findOne({ _id: req.params.id }).then(function (profile) {
            res.send(profile);
            console.log("updated profile");
        })
    }).catch(next);
});

// delete post
router.delete('/post/:id', function (req, res, next) {
    post.findOneAndDelete({ _id: req.params.id }).then(function (post) {
        res.send(post);
    }).catch(next);
});

//delete event
router.delete('/event/:id', function (req, res, next) {
    event.findOneAndDelete({ _id: req.params.id }).then(function (event) {
        res.send(event);
    }).catch(next);
});

module.exports = router;