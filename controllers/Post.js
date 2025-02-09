const User = require("../models/User")
const Post = require("../models/Post")

const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
require("dotenv").config()
const cloudinary = require("cloudinary").v2
//cloudinary configuration
cloudinary.config({
              cloud_name: process.env.CLOUD_NAME,
              api_key: process.env.API_KEY,
              api_secret: process.env.API_SECRET
});
//Create a new Post
const createPost = async (req, res) => {
              try {




                            const uploadedImage = await cloudinary.uploader.upload(req.files.image.tempFilePath)
                            const token = req.headers.authorization.split(" ")[1];
                            const verifyUser = await jwt.verify(token, 'ankit 123');

                            const post = new Post({
                                          _id: new mongoose.Types.ObjectId,
                                          content: req.body.content,
                                          imageUrl: uploadedImage.secure_url,
                                          imageId: uploadedImage.public_id,
                                          userId: verifyUser._id

                            })
                            await post.save();
                            res.json({
                                          success: true,
                                          message: "Post is created Sucessfully",
                                          post: post

                            })






              }

              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })

              }
}

//Get all the post-list
const getAllPost = async (req, res) => {
              try {
                            const token = req.headers.authorization.split(" ")[1];
                            const user = await jwt.verify(token, 'ankit 123');
                            const post = await Post.find()
                            res.json({
                                          success: true,
                                          message: "All Post are Here",
                                          posts: post
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }

}



const updatePost = async (req, res) => {
              try {
                            const token = req.headers.authorization.split(" ")[1];
                            const verifyUser = await jwt.verify(token, 'ankit 123');
                            const post = await Post.findById(req.params.postId);

                            if (!post) {
                                          return res.json({
                                                        success: false,
                                                        message: "Post Not Found"
                                          });
                            }

                            if (verifyUser._id != post.userId) {
                                          return res.json({
                                                        success: false,
                                                        message: "Unauthorized Action"
                                          });
                            }

                            const updatedData = {
                                          content: req.body.content || post.content,
                            };

                            if (req.files && req.files.image) {
                                          await cloudinary.uploader.destroy(post.imageId);
                                          const uploadedImage = await cloudinary.uploader.upload(req.files.image.tempFilePath);
                                          updatedData.imageUrl = uploadedImage.secure_url;
                                          updatedData.imageId = uploadedImage.public_id;
                            }

                            const updatedPost = await Post.findByIdAndUpdate(req.params.postId, updatedData, { new: true });

                            res.json({
                                          success: true,
                                          message: "Post updated successfully",
                                          post: updatedPost
                            });
              } catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            });
              }
};

const getPaginatedPosts = async (req, res) => {
              try {
                            const pageNum = req.query.page
                            const pageLimit = 2;

                            const posts = await Post.find().skip((pageNum - 1) * pageLimit).limit(pageLimit).sort({ _id: -1 })



                            res.json({
                                          success: true,
                                          message: "Posts are listed",
                                          posts: posts
                            });
              } catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message,
                            });
              }
};

module.exports = { getPaginatedPosts };
module.exports = { createPost, getAllPost, getPaginatedPosts, updatePost }