const Post = require("../../models/Post");
const Tag = require("../../models/Tag");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  try {
    await req.post.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "name -_id",
      })
      .populate("tags");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.tagCreate = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(204).json(tag);
  } catch (error) {
    next(error);
  }
};

// exports.tagAdd = async (req, res, next) => {
//   try {
//     const tag = await Tag.create(req.body);
//     await req.post.updateOne({ $push: { tags: tag._id } });
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

exports.tagAdd = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    if (!req.post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    // Update the post's tags field with the newly created tag's _id
    await req.post.updateOne({ $push: { tags: tag._id } });

    const newPostData = {
      ...req.body,
      tags: [tag._id],
      author: req.post.author, // Assuming the author information is stored in req.post.author
    };
    // Create a new post from req.body
    const newPost = await Post.create(newPostData);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate("tags");
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};
