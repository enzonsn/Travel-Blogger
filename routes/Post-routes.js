const router = require("express").Router();
const { User, Post } = require("../models");

const sequelize = require("../config/connection");
const passport = require("passport");
// const withAuth = require('');

// !!!!!!!!!!!!! WE NEED TO ADD USER-AUTH IN THESE ROUTES !!!!!!!!!!!!!

// get all posts
router.get("/", (req, res) => {
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
    .then((dbPostData) => res.json(dbPostData))
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

// create a post!!!!!!!!!!*************
router.post("/",(req, res) => {
  console.log(req);
  Post.create({
    post_destination: req.body.post_destination,
    post_content: req.body.post_content,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
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

// delete a post route
router.delete("/:id", (req, res) => {
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

module.exports = router;
