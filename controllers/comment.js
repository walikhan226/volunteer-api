const Comment = require('../models/post');
const Post = require('../models/post');
const User = require("../models/user");

//creat new comment
exports.create_comment = (req, res, next) => {
    const userId = req.body.id;
    const postId = req.body.postId;
    const comment = new Comment({
        content: req.body.content,
        post: req.body.postId,
        creator: req.body.id
    })
    User.findOne({ _id: userId })
        .then(doc => {
            comment.creator = doc;
            comment.save();
            console.log("comment saved to user");
        })
    Post.findOne({ _id: postId })
        .then(result => {
            comment.post = result;
            comment.save();
            result.comment.push(comment);
            result.save();
            console.log("comment saved to post");
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}