const router = require('express').Router();
const { User } = require('../models')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
router.use(passport.session());
router.use(passport.initialize());

router.get('/',  (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: { id: req.params.id }
  })
})

// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id
//     }

//   }).then(dbUser => {
//     res.json(dbUser)
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   })
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {

// res.redirect('/home');

// });

// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/home');
//     });
//   })(req, res, next);
// });

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

router.post('/register',  (req, res) => {
  User.create({

    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    location: req.body.location,
    bio: req.body.bio

  }).then(dbUser =>{
    return dbUser
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

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     // return next();
//     res.json('authenticated')
//   }
//   // res.redirect('/');
//   res.json(' not authenticated')
// }
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  return res.redirect('/')
    
  }
  next()
  
}

passport.use(new LocalStrategy(
  function (username, password, done) {
      User.findOne({ where: { username: username } })
           .then(function (user) {
               if (!user) {
                   return done(null, false, { message: 'Incorrect username.' });
               }
               if (!user.password === password) {
                   return done(null, false, { message: 'Incorrect password.' });
               }
               return done(null, user);
           })
           .catch(err => done(err));
  }
));

passport.serializeUser(function (user, done) {
  console.log('serialized')
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => {
    console.log('deserializing user:', user);
   return done(null, user);
  }).catch(function(err) {
    if (err) {
      throw err;
    }
 });
});
router.use(function(err, req, res, next) {
  console.log(err);
});


module.exports = router