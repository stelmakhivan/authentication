const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config/database');
const PORT = process.env.PORT || 3000;

mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.warn('Connected to MongoDB'));

db.on('error', err => console.error(err));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/css'),
    sourceMap: true,
    debug: true,
    prefix:  '/css',
    outputStyle: 'compressed'
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.warn(`Server started on port ${PORT}...`);
});
