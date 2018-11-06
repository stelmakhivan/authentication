const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook', {display: 'page' || 'popup' || 'touch',
  scope: ['email']}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/users/login' }));

module.exports = router;
