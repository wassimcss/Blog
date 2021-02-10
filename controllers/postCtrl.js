const Post = require("../models/Post");

const postCtrl = {
  getAllPost: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .exec();

      res.send(posts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getFollwowedPost: async (req, res) => {
    try {
      const posts = await Post.find({ postedBy: { $in: [req.user.following] } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt");
      res.send(posts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createPost: async (req, res) => {
    const { title, body, photo } = req.body;
    if (!title || !body) return res.status(400).send({ msg: "type tile and body are mandatory" })
    req.user.password = undefined;
    const newPost = new Post({
      title,
      body,
      photo,
      postedBy: req.user,
    });
    try {
     
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getMyPost: async (req, res) => {
    try {
      const posts = await Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  like: async (req, res) => {
    try {
      const likes = await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.user._id } },
        { useFindAndModify: false, new: true }
      );
      res.send(likes);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  unlike: async (req, res) => {
    try {
      const likes = await Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.user._id } },
        { useFindAndModify: false, new: true }
      );
      res.send(likes);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  comments: async (req, res) => {
    try {
      const comment = {
        text: req.body.text,
        postedBy: req.user._id,
      };
      const commentedPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        { useFindAndModify: false, new: true }
      )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        
      res.send(commentedPost);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId }).populate(
        "postedId",
        "_id"
      );

      if (!post) return res.status(404).json({ msg: "not found" });
      if (post.postedBy._id.toString() === req.user._id.toString())
       {
         await post.remove();
         res.json("post removed")

       }
        
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = postCtrl;
