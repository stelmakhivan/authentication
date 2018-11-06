const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  login: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  secret: {
    type: String,
  }
});

UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);

exports.user = User;
