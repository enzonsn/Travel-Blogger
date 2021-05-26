if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3003;
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
const routes = require('./routes');

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening', PORT));
});