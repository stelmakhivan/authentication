const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/reset', (req, res) => {
  res.render('sections/reset');
});

router.post('/reset', (req, res) => {
  req.checkBody('password2', 'Password do not match').equals(req.body.password1);

  const errors = req.validationErrors();

  if (errors) {
    res.render('sections/reset', {
      errors: errors
    });
  } else {
    const newPassword = {
      password: req.body.password1
    };
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        return;
      }
      bcrypt.hash(newPassword.password, salt, (err, hash) => {
        if (err) {
          console.error(err);
        }
        newPassword.password = hash;

        User.findOneAndUpdate({login: req.body.login},
          {$set: {password: newPassword.password}},
          {new: true},
          (err, user) => {
            if (err) {
              console.error(err);
              res.redirect('/');
            }
            if (!user) {
              req.flash('danger', 'User does not exist');
              res.redirect('/users/reset');
            } else {
              req.flash('success', 'You have successfully changed your password');
              res.redirect('/users/login');
            }
          });
      });
    });
  }
});

module.exports = router;
