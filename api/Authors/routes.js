const express = require("express");
const { getAllAuthors, createAuthors, postsCreate } = require("./controllers");
const router = express.Router();

router.get("/", getAllAuthors);
router.post("/", createAuthors);

router.post("/:authorId", postsCreate);

module.exports = router;
