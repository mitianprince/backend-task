const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const { addComment } = require("../controllers/Comment");
const router = express.Router();

router.post("/:postId", checkAuth, addComment)
module.exports = router;
