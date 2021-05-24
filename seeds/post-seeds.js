const { Post } = require('../models');

const postData = [
    {
        post_content: "Travel Blog is up and running!",
        post_url: "Testing",
         user_id: 1
    },
    {
        post_content: "Travel Blog is up and running 2!",
        post_url: "Test",
        user_id: 2
    },
    {
        post_content: "Travel Blog is up and running 3!",
        post_url: "Tester",
        user_id: 3
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;