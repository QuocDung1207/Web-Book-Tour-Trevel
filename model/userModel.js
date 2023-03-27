/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//name,mail,photo,password,passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please tell us your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This only works ion SAVE !!
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
});
userSchema.pre("save", async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

// eslint-disable-next-line no-unused-vars
const User = mongoose.model("User", userSchema);

module.exports = User;
