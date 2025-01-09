const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

usersSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

usersSchema.statics.findByCredentials = async (email, password) => {
  try {
    let user = await Users.findOne({ email: email });
    console.log(user, "212");

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log(user.password, password, "46");

      if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
      }
      return user;
    }
  } catch (error) {
    console.log(error, "51");

    return error.message;
  }
};

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
