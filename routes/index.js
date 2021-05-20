const router = require('express').Router();

const userRoutes = require('./User-routes.js');
const postRoutes = require('./Post-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;