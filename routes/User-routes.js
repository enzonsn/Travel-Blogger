const router = require('express').Router();
const { User } = require('../models')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

router.get('/', checkAuthenticated, (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: { id: req.body.id }
  })
})

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }

  }).then(dbUser => {
    if (!dbUser) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUser)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/login', checkAuthenticated,(req, res) => {
User.findOne({
  where: req.body.username
}).then(dbUser=>{
  if (!dbUser) {
    res.status(400).json({ message: 'No user with that email address!' });
    return;
  }
  res.json(dbUser)
})
const verifyPassword = dbUser.checkPassword(req.body.password);
if (!verifyPassword) {
  res.status(400).json({ message: 'Incorrect password!' });
  return;
}

});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/welcome',
  failureRedirect: '/login',
  failureFlash: true
}));

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
  User.create({

    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    location: req.body.location,
    bio: req.body.bio

  }).then(dbUser => {

    res.json(dbUser)

  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.put('/:id', (req, res) => {

  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
      if (!dbUser[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
      if (!dbUser) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

passport.use(new LocalStrategy(
  function (username, password, done) {

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = router