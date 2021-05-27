const router = require('express').Router();
const { User } = require('../models')
const passport = require('passport')
require('../passport-config')(passport)

router.use(passport.session());
router.use(passport.initialize());
router.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
router.get('/test', (req, res)=>{

  console.log(req.user.id)
  res.json(req.user.id)
})
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

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
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
    res.redirect('/home')
    console.log(dbUser) 
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
  res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  return res.redirect('/')
  }
  res.locals.user = req.user
  next()
}

router.use(function(err, req, res, next) {
  console.log(err);
});


module.exports = router