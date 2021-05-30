const router = require("express").Router();
/* const sequelize = require("../config/connection"); */ 
const { Post, User} = require("../models");
// const withAuth = require("../utils/auth");


router.get("/edit/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      "id",
      "post_destination",
      "post_content",
      "post_url",
      "created_at"
    ],
    include: [
      {
        model: User,
        attributes: ["id", "username", "bio", "location"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        // console.log("HERE IS THE dbPostData---------------", dbPostData);
        console.log(post);
        res.render("single-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
