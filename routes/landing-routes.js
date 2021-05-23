const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("landingpage");
});

module.exports = router;