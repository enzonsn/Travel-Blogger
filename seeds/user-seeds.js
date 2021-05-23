const { User } = require('../models');

const userData = [
    {
        username: "joe_nobody",
        password: "p@ssword1",
        email: "joe_n@gmail.com",
        bio: "lorem ipsum",
        location: "Denver, Colorado"
        
    }]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;