const router = require('express').Router();

const userRoutes = require('./User-routes');
const postRoutes = require('./Post-routes');
const homeRoutes = require('./homepage-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/home', homeRoutes);

module.exports = router;