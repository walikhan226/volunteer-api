const Comment = require('../models/post');
const Post = require('../models/post');
const User = require("../models/user");

//creat new comment
exports.create_comment = (req, res, next) => {
    const comment = new Comment({
        content: req.body.content,
        post: req.params.postId,
        creator: req.params.userId
    })
    User.findOne({_id:req.params.userId})
    .then(doc=>{
        comment.creator=doc;
        comment.save();
        console.log("bloblo")
    })
    Post.findOne({ _id: req.params.postId })
        .then(result => {
            comment.post = result;
            comment.save();
            result.comment.push(comment);
            result.save();
            console.log("done");
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}