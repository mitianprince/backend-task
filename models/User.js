const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
              _id: mongoose.Schema.Types.ObjectId,
              name:
              {
                            type: String,
                            required: ['true', "Name is required"],
                            minLength: [5, "Name must be at least 5 character"],
                            maxLength: [50, 'Name should be less than 50 character'],
                            lowercase: true,
                            trim: true
              },
              email:
              {
                            type: String,
                            unique: true,
                            trim: true,
                            lowercase: true,
                            required: ['true', "Email is required"],
                            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
              },
              password:
              {
                            type: String,
                            minlength: [6, "Password size should be at leat 6"],

                            trim: true

              },

},
              {
                            timestamps: true,
              })


const userModel = mongoose.model("User", userSchema);
module.exports = userModel