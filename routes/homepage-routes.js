const router = require("express").Router();
const { User, Post } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const { post } = require("./profile-page-routes");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_destination", "post_content", "post_url", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username", "bio"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      // console.log("home-routes line 15", dbPostData);
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
