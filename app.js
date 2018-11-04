const express = require('express');
const https = require('https');
const fs = require('fs');
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

app.get('/', (req, res) => {
  res.render('index');
});

const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const remind = require('./routes/remind');
const reset = require('./routes/reset');
const facebook = require('./routes/facebook');

app.use('/users', register);
app.use('/users', login);
app.use('/users', logout);
app.use('/users', remind);
app.use('/users', reset);
app.use('/users', facebook);
app.use((req, res,) => {
  res.status(404).render('index');
});

const options = {
  key: fs.readFileSync( './secure/localhost.key' ),
  cert: fs.readFileSync( './secure/localhost.cert' ),
  requestCert: false,
  rejectUnauthorized: false
};

const server = https.createServer( options, app );

server.listen( PORT, function () {
  console.warn(`Server started on port ${PORT}...`);
});

// app.listen(PORT, () => {
//   console.warn(`Server started on port ${PORT}...`);
// });
