const Post = require("../models/post");
const user = require('../models/user');



//view all posts about what user follow without testing same problem from events line 7
exports.home = (req, res, next) => {
    const userId = req.query.id;
    
    user.findOne({ _id: userId })
    .populate("following","post")
       .then(result => {
            /*    convert array into array of objects 
            let posts =[]
            posts=result.post;
            posts.forEach(element => {
                Post.findOne({_id:element})
                .then(res=>{
                    console.log(res.content);
                })
            });*/
            res.status(200).json({ posts: result.post })
       }) 

        /*
       // old way to fetch data 
        user.findOne({ _id: userId })
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
            .populate("post")
            .exec()
            .then(result => {
                let resd = []
                resd[0] = result;
                let red = resd.map((object) => {
                    console.log(object.following[0].post)
                    return {
                        "postsOfFollowing": object.following[0].post,
                    }
                })
                res.status(200).json({ post:red&&result.post });
            })*/
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//view single post
exports.view_post = (req, res, next) => {
    const postId = req.query.postId;
    Post.findOne({ _id: postId })
        .populate("comment", "content")
        .populate("creator", "name", user)
        .exec()
        .then(result => {
            let name = String(result.creator.name)
            console.log(typeof name);
            console.log(name)
            res.status(200).json({
                content: result.content,
                name: name,
                comment: result.comment,
                likes: result.likes
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}


//creat new post
exports.create_post = (req, res, next) => {
    const userId = req.body.id;
    const post = new Post({
        content: req.body.content,
        likes: 0,
        creator: req.body.id
    })
    user.findOne({ _id: userId })
        .exec()
        .then(result => {
            post.creator = result;
            post.save();
            result.post.push(post);
            result.save();
            console.log("done");
            res.status(200).json({ post });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}


// edit post 
exports.edit_post = (req, res, next) => {
    const userId = req.body.id;
    const postId = req.body.postId;
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
    const userId = req.body.id;
    const postId = req.body.postId;
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
    const postId = req.query.postId;
    Post.findOne({ _id: postId })
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
exports.share = (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.body.id;
    user.findOne({ _id: userId })
        .exec()
        .then(result => {
            console.log(result);
            result.post.push(postId);
            result.save();
            console.log("it done");
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err });
        })
}
