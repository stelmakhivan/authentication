const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const passport = require('passport');
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

app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(session({
  secret: process.env.DB_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  },
  customValidators: {
    isPsd1EqPsd2: (psd1, psd2) => {
      console.warn(psd1 === psd2);
      return psd1 === psd2;
    }
  }
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

const users = require('./routes/users');
app.use('/users', users);

app.listen(PORT, () => {
  console.warn(`Server started on port ${PORT}...`);
});
