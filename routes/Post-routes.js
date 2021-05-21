const router = require("express").Router();
const { User, Post } = require("../models");

const sequelize = require("../config/connection");
// const withAuth = require('');

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

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_content", "post_url"],
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

module.exports = router;
