const router = require('express').Router();
const { Post, User } = require('../models');

const sequelize = require('../config/connection');
const passport = require("passport");
/* const withAuth = require('../utils/auth'); */

//get all posts for the profile page
router.get('/', (req, res) => {
    Post.findAll({
      where: { 
        user_id: 1,
      },
      attributes: [
        'id',
        'post_destination',
        'post_content',
        'post_url',
        'user_id',
        'created_at',
      ],
      include: [
        {
            model: User,
            attributes: ['username']
          }
      ]
    })
      .then(dbPostData => {
        // console.log("this is the dbPostdData:", dbPostData);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // console.log("this is the post data:", posts);
        res.render('profile-page', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/create/', (req, res) => {
  console.log("---------------------##########-----------------")
    Post.findAll({
      attributes: [
        'id',
        'post_content',
        'post_url'
      ],
      include: [
        {
            model: User,
            attributes: ['username']
          },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;
