const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
              _id: mongoose.Schema.Types.ObjectId,
              userId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User",
                            required: true,
              },
              content: {
                            type: String,
                            required: true,
                            maxlength: 1000,
              },
              imageUrl:
              {
                            type: String
              },
              imageId:
              {
                            type: String,
              },

              comments: [
                            {
                                          type: mongoose.Schema.Types.ObjectId,
                                          ref: "Comment",
                            },
              ],
},



              {
                            timestamps: true,
              }
)

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel