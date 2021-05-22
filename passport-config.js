const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
const user = getUserByUsername(username)
if (username == null){
    return done(err, false, { message:'No user with that email'});
}
try {
   if (await bcrypt.compare(password, user.password)) {
       return done(null, user)
} else {
    return done(err, false, {message:"Password incorrect."})
}
} catch (err) {
return done(err);
}
    }
passport.use(new LocalStrategy({usernameField: 'username'}, 
authenticateUser))
passport.serializeUser((user, done)=> done(err, user.id))
passport.deserializeUser((id, done)=>{
   return done(err, getUserById(id))
})
}

module.exports = initialize