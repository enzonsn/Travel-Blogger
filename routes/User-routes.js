const router = require('express').Router();
// const { json } = require('sequelize/types');
const { User } = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('../passport-config');

initializePassport(
  passport,
  username => User.findOne(user => user.username === username),
  id => User.findOne(user => user.id === id)
);

router.get('/', checkAuthenticated, (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
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

router.get('/login', (req, res)=>{

});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
router.delete('/logout', (req, res)=>{
  req.logOut()
  res.redirect('/login')
})
router.post('/register', checkNotAuthenticated, (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
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
    })
      .then(dbUser => {
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
    })
      .then(dbUser => {
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

  function checkAuthenticated(){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
 function checkNotAuthenticated(){
  if (req.isAuthenticated()) {
   return res.redirect('/');
  }
  next();
 }
module.exports = router