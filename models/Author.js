const { model, Schema } = require("mongoose");

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = model("Author", AuthorSchema);
