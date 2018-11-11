const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Test');
});

app.get('/users/login', (req, res) => {
  res.status(200).send('Test Log IN');
});

app.get('/users/register', (req, res) => {
  res.status(200).send('Test Sign UP');
});

module.exports = app;
