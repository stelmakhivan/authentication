const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', {scope: ['profile']})
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
