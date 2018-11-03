const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/login', (req,res) => {
  res.render('sections/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
