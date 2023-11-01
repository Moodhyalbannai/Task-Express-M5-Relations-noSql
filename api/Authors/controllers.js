const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};

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

exports.deleteAuthors = async (req, res, next) => {
  try {
    await Author.findByIdAndRemove({ _id: req.author._id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsUpdate = async (req, res, next) => {
  try {
    await Author.findByIdAndUpdate(req.author.id, req.body);
    res.status(204).end();
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
