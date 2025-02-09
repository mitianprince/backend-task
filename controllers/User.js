const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
//User Register 

const register = async (req, res) => {
              try {

                            // Hash the password
                            const hashPassword = await bcrypt.hash(req.body.password, 10);
                            const existingUser = await User.findOne({ email: req.body.email });
                            if (existingUser) {
                                          res.json({
                                                        success: false,
                                                        messgae: "User already registerd"
                                          })
                            }
                            // Create a new user
                            const user = new User({
                                          _id: new mongoose.Types.ObjectId,
                                          name: req.body.name,
                                          email: req.body.email,
                                          password: hashPassword,

                            });

                            // Save the user to the database
                            await user.save();

                            res.json({
                                          success: true,
                                          message: "User successfully registered",
                                          user: user,
                            });

              }

              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}


const login = async (req, res) => {
              try {
                            console.log(req.body);

                            // Find user by email
                            const user = await User.findOne({ email: req.body.email });

                            // Check if user exists
                            if (!user) {
                                          return res.json({
                                                        success: false,
                                                        message: "User not found",
                                          });
                            }

                            // Compare passwords
                            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

                            if (!isPasswordValid) {
                                          return res.json({
                                                        success: false,
                                                        message: "Invalid password",
                                          });
                            }

                            // Generate JWT token
                            const token = jwt.sign(
                                          {
                                                        _id: user._id,
                                                        email: user.email,
                                                        name: user.name,

                                          },
                                          'ankit 123', // Secret key, consider storing this securely in environment variables
                                          { expiresIn: '365d' }
                            );

                            res.json({
                                          success: true,
                                          message: "Successfully logged in",
                                          user: user,
                                          token: token,
                            });

              }

              catch (err) {
                  res.json({
                                          success: false,
                                          message: err.message
                            })

              }
}



const getProfile = async (req, res) => {

              try {

                            const token = req.headers.authorization.split(" ")[1];
                            const verifyUser = await jwt.verify(token, 'ankit 123');
                            console.log(verifyUser)
                            const userId = verifyUser._id
                            const user = await User.findById(userId)
                            res.json({
                                          sucess: true,
                                          message: "Your Profile details here",
                                          user: user
                            })


              }
              catch (err) {
                            res.json({
                                          sucess: false,
                                          message: err.message
                            })
              }
}

const logout = async (req, res) => {
              try {
                            const { token } = req.body;
                            const user = await User.findOne({ token: token });
                            if (!user) {
                                          res.json({
                                                        success: false,
                                                        message: "User not found"
                                          })
                            }
                            user.token = null; // Remove the token from the user record
                            await user.save();

                            res.json({
                                          success: true,
                                          message: "User logged out successfully"
                            });

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }

}

const updateUser = async (req, res) => {
              try {
                            const token = req.headers.authorization.split(" ")[1];
                            const verifyUser = await jwt.verify(token, 'ankit 123');
                            const user = await User.findById(req.params.userId);

                            if (!user) {
                                          return res.json({
                                                        success: false,
                                                        message: "User not found"
                                          });
                            }

                            if (user._id.toString() !== verifyUser._id) {
                                          return res.json({
                                                        success: false,
                                                        message: "You do not have permission to update this user"
                                          });
                            }

                            const updatedData = {
                                          fullName: req.body.fullName,
                                          email: req.body.email
                            };

                            const updatedUser = await User.findByIdAndUpdate(req.params.userId, updatedData, { new: true });

                            res.json({
                                          success: true,
                                          message: "User updated successfully",
                                          user: updatedUser
                            });
              } catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            });
              }
};

module.exports = { register, login, getProfile, updateUser, logout }
