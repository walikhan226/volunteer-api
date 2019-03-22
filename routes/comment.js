const express = require('express');
const router = express.Router();
const commentController = require("../controllers/comment");
const checkAuth = require('../middleware/check-auth');

//post method about add comment on exist post
router.post("/home/:userId/:postId/new", checkAuth, commentController.create_comment);
















module.exports = router