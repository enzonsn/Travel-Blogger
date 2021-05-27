if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3003;
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(cookieParser('secret'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: false
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


const routes = require('./routes');


app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening', PORT));
});