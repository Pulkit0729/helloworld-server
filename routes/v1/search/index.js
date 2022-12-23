const router = require('express').Router();

router.use('/project', require('./project'));
router.use('/user', require('./user'));
router.use('/skills', require('./skills'));


module.exports = router;