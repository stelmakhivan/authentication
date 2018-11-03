const express = require('express');
const router = new express.Router();

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
