const router = require('express').Router();

router.use('/authorize', require('./authorization'));
router.use('/user', require('./user'));
router.use('/project', require('./project'));
router.use('/search', require('./search'));
router.use('/message', require('./message'));

module.exports = router;