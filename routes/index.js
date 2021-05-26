const router = require('express').Router();

const userRoutes = require('./User-routes');
const postRoutes = require('./Post-routes');
const homeRoutes = require('./homepage-routes');
const landingRoutes = require('./landing-routes');
const profileRoutes = require('./profile-page-routes');
const aboutRoutes = require('./about-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/comments', commentRoutes);
router.use('/', landingRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/home', homeRoutes);
router.use('/', landingRoutes);
router.use('/profile', profileRoutes);
router.use('/about', aboutRoutes);

module.exports = router;