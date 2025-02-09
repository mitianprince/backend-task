
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const addComment = async (req, res) => {
              try {
                            const token = req.headers.authorization.split(" ")[1];
                            const verifyUser = await jwt.verify(token, 'ankit 123');
                            const post = await Post.findById(req.params.postId)
                            if (!post) {
                                          res.json({
                                                        success: false,
                                                        message: "Post Not Found"
                                          })
                            }

                            const comment = new Comment({
                                          _id: new mongoose.Types.ObjectId,
                                          text: req.body.text,
                                          userId: verifyUser._id,
                                          postId: req.params.postId

                            })
                            await comment.save();
                            post.comments.push(comment._id);
                            await post.save();
                            res.json({
                                          success: true,
                                          message: "Comment is done",
                                          comment: comment
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })

              }
}

module.exports = { addComment }
