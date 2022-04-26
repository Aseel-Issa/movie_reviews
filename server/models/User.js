
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

// user representation in database
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email name is required"]
  },
  password: {
    type: String,
    required: [true, "Password name is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
}, { timestamps: true })

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel}