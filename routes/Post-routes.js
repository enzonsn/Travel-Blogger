const router = require("express").Router();
const { User, Post } = require("../models");

const sequelize = require("../config/connection");
const passport = require("passport");
// const withAuth = require('');
router.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
// !!!!!!!!!!!!! WE NEED TO ADD USER-AUTH IN THESE ROUTES !!!!!!!!!!!!!

// get all posts
router.get("/",  (req, res) => {
  console.log("======================");
  Post.findAll({
    // order: [["created_at", "DESC"]],
    attributes: ["id", "post_content", "post_url", "user_id"],
    include: [
      {
        model: User,
        attributes: ["id", "username", "bio", "location"],
      },
    ],
  })
    .then((dbPostData) => {
    // console.log("post data ---------", dbPostData);
    res.json(dbPostData);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get post by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_destination", "post_content", "post_url"],
    include: [
      {
        model: User,
        attributes: ["id", "username", "bio", "location"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a post!!!!!!!!!!NOT BEING USED???
router.post("/",(req, res) => {
  console.log("create route hit");
  Post.create({
    post_destination: req.body.post_destination,
    post_content: req.body.post_content,
    post_url: req.body.post_url,
    user_id: req.user.id,
   
    include: [{
      model: User,
      attributes: ['username', 'id']
    }] 
      
    
  })
    .then(res.redirect('/profile'))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post
router.put("/:id", (req, res) => {
  Post.update(
    {
      post_content: req.body.post_content,
      post_url: req.body.post_url,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a post
router.delete("/:id", (req, res) => {
  console.log("inside delete post route!!!!!!!!!");
    Post.destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((dbPostData) => {
          if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
          }
          res.json(dbPostData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
})

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  return res.redirect('/')
  }
  res.locals.user = req.session.user
  next()
}

module.exports = router;
