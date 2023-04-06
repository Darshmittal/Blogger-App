import mongoose from "mongoose";


//defining mongoose schema for user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    // this field is an array of Blog object IDs.
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },

  //timestamps option set to true, which will automatically add createdAt and updatedAt fields to each user document.
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

export default user;
