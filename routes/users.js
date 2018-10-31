const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

router.post('/nexmo', (req,res) => {
  process.env.VER_CODE = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;

  const phoneNumber = req.body.number;
  const phonePattern = new RegExp('^((\\+3|8)+([0-9]){11})$');

  if (phoneNumber.match(phonePattern)) {
    // res.send(`${process.env.VER_CODE}`);
  } else {
    res.send('Wrong phone number');
  }
});

module.exports = router;
