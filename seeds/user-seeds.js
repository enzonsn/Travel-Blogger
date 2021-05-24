const { User } = require('../models');

const userData = [
    {
        username: "joe_nobody",
        password: "p@ssword1",
        bio: "lorem ipsum",
        location: "Denver, Colorado"
        
    },
    {
        username: "WildBill",
        password: "p@ssword1",
        bio: "i like hot dogs and short walks in the yard.",
        location: "Portland, Oregon"
        
    },
    {
        username: "SamIAm",
        password: "p@ssword1",
        bio: "I do not like green egs and ham.",
        location: "Austin, Texas"
        
    }]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;