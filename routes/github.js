const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/github',
  passport.authenticate('github',  { scope: [ 'user:email' ] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
