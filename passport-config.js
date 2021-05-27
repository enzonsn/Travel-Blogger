const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

module.exports = function(passport){
    passport.use('local', new LocalStrategy(
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
        done(null, user.id);
      });
      
      passport.deserializeUser(function (id, done) {
        User.findByPk(id).then((user) => {
         return done(null, user);
        }).catch(function(err) {
          if (err) {
            throw err;
          }
       });
      });
}