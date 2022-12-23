const router = require('express').Router();

router.use('/general', require('./general'));
router.use('/create', require('./create'));
router.use('/members', require('./members'));
router.use('/techStack', require('./techStack'));


module.exports = router;