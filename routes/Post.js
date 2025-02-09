const express = require("express")
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const { createPost, getAllPost, getPaginatedPosts, deletPost, updatePost } = require("../controllers/Post");
router.post("/create", checkAuth, createPost)
router.get("/all", checkAuth, getAllPost)
router.get("/", checkAuth, getPaginatedPosts)

router.put("/:postId", checkAuth, updatePost)

module.exports = router;