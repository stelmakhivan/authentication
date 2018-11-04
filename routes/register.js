const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: `${process.env.NEXMO_API_KEY}`,
//   apiSecret: `${process.env.NEXMO_API_SECRET}`
// });

const User = require('../models/user').user;

router.get('/register', (req,res) => {
  res.render('sections/register');
});

router.get('/nexmo', (req,res) => {
  res.render('sections/register');
});

router.post('/nexmo', (req, res) => {
  process.env.VER_CODE = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;

  const phonePattern = new RegExp('^((\\+3|8)+([0-9]){11})$');
  res.locals.login = req.body['signup-login'];
  res.locals.email = req.body['signup-email'];
  res.locals.password = req.body['signup-password'];
  res.locals.phoneNumber = req.body['signup-phone'];
  res.locals.verCode = req.body['signup-vercode'];

  req.checkBody('signup-phone', 'Phone number is required').notEmpty();
  req.checkBody('signup-phone', 'Input phone number such as +380121234567')
    .matches(phonePattern);

  const errors = req.validationErrors();

  if (errors) {
    res.render('sections/register', {
      errors: errors
    });
  } else {
    req.flash('success', 'We send verification code to your phone');
    res.render('sections/register');

    // Trial Nexmo
    // const from = 'Nexmo';
    // const to = res.locals.phoneNumber;
    // const text = `${process.env.VER_CODE}`;
    // nexmo.message.sendSms(from, to, text);

    console.warn(`${process.env.VER_CODE}`);
  }
});

router.post('/register', (req,res) => {
  res.locals.login = req.body['signup-login'];
  res.locals.email = req.body['signup-email'];
  res.locals.password = req.body['signup-password'];
  res.locals.phoneNumber = req.body['signup-phone'];
  res.locals.verCode = req.body['signup-vercode'];

  req.checkBody('signup-login', 'Name is required').notEmpty();
  req.checkBody('signup-email', 'Email is required').notEmpty();
  req.checkBody('signup-email', 'Email is not valid').isEmail();
  req.checkBody('signup-phone', 'Phone number is required').notEmpty();
  req.checkBody('signup-phone', 'Input phone number such as +380121234567')
    .matches('^((\\+3|8)+([0-9]){11})$');
  req.checkBody('signup-password', 'Password is required').notEmpty();
  req.checkBody('signup-vercode', 'Verification code do not match').equals(process.env.VER_CODE);

  const errors = req.validationErrors();

  User.findOne({login: res.locals.login}, (err, login) => {
    if (err) {
      console.error(err);
    }
    if (errors) {
      res.render('sections/register', {
        errors: errors
      });
    } else if (login) {
      req.flash('danger', 'User is already exist');
      res.render('sections/register');
    } else {
      User.findOne({email: res.locals.email}, (err, email) => {
        if (err) {
          console.error(err);
        }
        if (errors) {
          res.render('sections/register', {
            errors: errors
          });
        } else if (email) {
          req.flash('danger', 'User is already exist');
          res.render('sections/register');
        } else {
          const newUser = new User({
            login: res.locals.login,
            email: res.locals.email,
            password: res.locals.password,
            phoneNumber: res.locals.phoneNumber
          });

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              console.error(err);
              return;
            }
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                console.error(err);
              }
              newUser.password = hash;
              newUser.save (err => {
                if (err) {
                  console.error(err);
                } else {
                  req.flash('success', 'You are now register and can log in');
                  res.redirect('/users/login');
                }
              });
            });
          });
        }
      });
    }
  });
});

module.exports = router;
