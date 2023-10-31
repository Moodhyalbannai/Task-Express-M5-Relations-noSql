const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts");
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

exports.createAuthors = async (req, res, next) => {
  try {
    const authors = await Author.create(req.body);
    res.status(201).json(authors);
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findById(authorId);
    if (!author) return res.status(404).json({ message: "Author Not Found!" });
    const newPost = await Post.create({ ...req.body, author: author._id });
    await author.updateOne({ $push: { posts: newPost._id } });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
