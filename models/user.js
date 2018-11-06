const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
});

const FacebookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  }
});

const GoogleSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
const FacebookUser = mongoose.model('Facebook', FacebookSchema);
const GoogleUser = mongoose.model('Google', GoogleSchema);
exports.user = User;
exports.facebookUser = FacebookUser;
exports.googleUser = GoogleUser;
