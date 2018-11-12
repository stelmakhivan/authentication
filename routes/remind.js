const express = require('express');
const router = new express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/user').user;

router.get('/remind', (req, res) => {
  res.render('sections/remind');
});

router.post('/remind', (req, res) => {
  User.findOne({email: req.body.remind}, (err, user) => {
    if (err) {
      console.error(err);
      res.redirect('/');
    }
    if (!user) {
      req.flash('danger', 'User does not exist');
      res.redirect('/users/remind');
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.GOOGLE_ACCOUNT}`,
          pass: `${process.env.GOOGLE_PASSWORD}`
        }
      });

      const mailOptions = {
        from: `Sample Auth <${process.env.GOOGLE_ACCOUNT}>`,
        to: `${req.body.remind}`,
        subject: 'Remind Password',
        html: `
<h1>Hi, ${user.login}</h1>
<p>Go to
<a href='https://sampleauthentication.herokuapp.com/users/reset'
target='_blank'>Reset password</a> to reset your password</p>
`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.warn('Email sent: ' + info.response);
        }
      });
      req.flash('success', 'We have sent instructions to your email');
      res.redirect('/users/login');
    }
  });
});

module.exports = router;
