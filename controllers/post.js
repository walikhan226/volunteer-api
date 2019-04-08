const Post = require("../models/post");
const user = require('../models/user');


//view all posts about what user follow
exports.home = (req, res, next) => {
    user.findOne({ _id: req.params.userId })
        .populate({
            // get following posts
            path: "following",
            populate: {
                path: "post",
                populate: {
                    path: "comment"
                }
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


//creat new post
exports.create_post = (req, res, next) => {
    const post = new Post({
        content: req.body.content,
        likes: 0,
        creator: req.params.userId
    })
    user.findOne({ _id: req.params.userId })
        .then(result => {
            post.creator = result;
            post.save();
            result.post.push(post);
            result.save();
            console.log("done");
            res.status(200).json({ result });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}


//view single post
exports.view_post = (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
        .populate("creator", "name _id", user)
        .populate("comment", "content creator")
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}



// edit post 
exports.edit_post = (req, res, next) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    Post.findOne({ _id: postId })
        .then(result => {
            if (userId == result.creator._id) {
                Post.findOneAndUpdate({ _id: postId }, req.body)
                    .exec()
                Post.findOne({ _id: postId })
                    .then(doc => {
                        console.log(doc);
                        res.status(200).json({ doc });
                    })
            } else {
                res.status(200).json({ message: "you can't update this post" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//post delete
exports.delete_post = (req, res, next) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    Post.findOne({ _id: postId })
        .then(result => {
            if (userId == result.creator._id) {
                Post.findOneAndDelete({ _id: postId })
                    .then(() => {
                        res.status(200).json({ message: "post deleted successfully" })
                    })
            } else {
                res.status(200).json({ message: "you can't delete that" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}


//post like
exports.like = (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
        .then(post => {
            post.likes = post.likes + 1
            post.save();
            console.log(post);
            res.status(201).json({ post });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Error: err })
        })

}
// all work great without error test 8/4/2019