const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user').user;
const FacebookUser = require('../models/user').facebookUser;
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = passport => {
  passport.use(new LocalStrategy ({
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

      bcrypt.compare (password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: `${process.env.FACEBOOK_APP_ID}`,
    clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
    callbackURL: `${process.env.FACEBOOK_CALLBACK_URL}`
  },
  (accessToken, refreshToken, profile, done) => {
    console.warn(profile);
    process.nextTick(() => {
      FacebookUser.findOne({id: profile.id}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          const newUser = new FacebookUser();
          newUser.id = profile.id;
          newUser.token = accessToken;
          newUser.email = profile.emails[0].value;
          newUser.name = `${profile.name.givenName} ${profile.name.familyName}`;

          newUser.save(err => {
            if (err) {
              console.error(err);
            }
            return done(null, user);
          });
        }
      });
    });
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
