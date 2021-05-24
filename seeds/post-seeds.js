const { Post } = require('../models');

const postData = [
    {
        post_destination: "The Amazon",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint.",
        post_url: "/mockimages/Amazon.png",
        user_id: 1
    },
    {
        post_destination: "Marraco",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint2.",
        post_url: "/mockimages/Marracco.png",
        user_id: 2
    },
    {
        post_destination: "New Zealand",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint3.",
        post_url: "/mockimages/NewZealand.png",
        user_id: 3
    },
    {
        post_destination: "Norway",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint4.",
        post_url: "/mockimages/Norway.png",
        user_id: 1
    },
    {
        post_destination: "Santa Cruz, CA",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint5.",
        post_url: "/mockimages/SantaCruz.png",
        user_id: 2
    },
    {
        post_destination: "Cancun, Mexico",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint6.",
        post_url: "/mockimages/Mexico.png",
        user_id: 1
    },
    {
        post_destination: "Italy",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, incidunt fugiat. Ipsum deleniti, eligendi officiis quis ea est quae, distinctio repudiandae iure libero harum facere culpa aliquam saepe cum. Sint7.",
        post_url: "/mockimages/Italy.png",
        user_id: 2
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;