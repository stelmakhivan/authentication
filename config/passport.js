const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user').user;
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  }, (username, password, done) => {
    const query = {login: username};
    User.findOne(query, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
      });
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: `${process.env.FACEBOOK_APP_ID}`,
    clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
    callbackURL: `${process.env.FACEBOOK_CALLBACK_URL}`
  },
  (accessToken, refreshToken, profile, cb) => {
    console.warn(profile);
    process.nextTick(() => {
      User.findOrCreate({userid: profile.id},
        { login: profile.displayName, userid: profile.id }, (err, user) => {
          return cb(err, user);
        });
    });
  }
  ));

  passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`
  },
  (accessToken, refreshToken, profile, cb) => {
    console.warn(profile);
    User.findOrCreate({ userid: profile.id },
      { login: profile.displayName, userid: profile.id, googleId: profile.id}, (err, user) => {
        return cb(err, user);
      });
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
