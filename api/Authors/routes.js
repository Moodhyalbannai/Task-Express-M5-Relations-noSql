const express = require("express");
const {
  getAllAuthors,
  createAuthors,
  postsCreate,
  deleteAuthors,
  authorsUpdate,
  fetchAuthor,
} = require("./controllers");
const router = express.Router();

//Prepare a reusable function for all author method that includes authorId route
router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const error = new Error("Author Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", getAllAuthors);
router.post("/", createAuthors);
router.delete("/:authorId", deleteAuthors);
router.put("/:authorId", authorsUpdate);

//Relate post to author
router.post("/:authorId", postsCreate);

module.exports = router;
