const { Post } = require('../models');

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;