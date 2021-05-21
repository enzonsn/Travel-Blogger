const Post = require('./Post');
// const Comment = require('./Comment');
const User = require('./User')

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { Post, User };