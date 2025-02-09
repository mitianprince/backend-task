const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
              _id: mongoose.Schema.Types.ObjectId,
              postId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Post",
                            required: true,
              },
              userId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User",
                            required: true,
              },
              text: {
                            type: String,
                            required: true,
                            maxlength: 500,
              },

},
              {
                            timestamps: true
              })

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel
