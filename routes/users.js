const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

router.get('/register', (req,res) => {
  res.render('sections/register');
});

router.get('/nexmo', (req,res) => {
  res.render('sections/register');
});

router.get('/login', (req,res) => {
  res.render('sections/login');
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
    console.warn(`${process.env.VER_CODE}`);
  }
});

router.post('/register', (req,res) => {
  const login = req.body['signup-login'];
  const email = req.body['signup-email'];
  const password = req.body['signup-password'];
  const phoneNumber = req.body['signup-phone'];
  const verCode = req.body['signup-vercode'];

  req.checkBody('signup-login', 'Name is required').notEmpty();
  req.checkBody('signup-email', 'Email is required').notEmpty();
  req.checkBody('signup-email', 'Email is not valid').isEmail();
  req.checkBody('signup-phone', 'Phone number is required').notEmpty();
  req.checkBody('signup-phone', 'Input phone number such as +380121234567')
    .matches('^((\\+3|8)+([0-9]){11})$');
  req.checkBody('signup-password', 'Password is required').notEmpty();
  req.checkBody('signup-vercode', 'Verification code do not match').equals(process.env.VER_CODE);

  const errors = req.validationErrors();

  if (errors) {
    res.render('sections/register', {
      errors: errors
    });
  } else {
    const newUser = new User({
      login: login,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      verCode: verCode
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
        newUser.save(err => {
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

module.exports = router;
