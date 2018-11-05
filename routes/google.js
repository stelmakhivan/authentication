const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', {scope: ['profile']})
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.locals.user = res.req.user;
    res.redirect('/');
  });

module.exports = router;
