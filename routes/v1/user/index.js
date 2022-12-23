const router = require('express').Router();

router.use('/create', require('./create'));
router.use('/personal', require('./personal'));
router.use('/skills', require('./skills'));
router.use('/interests', require('./interests'));
router.use('/experiences', require('./experiences'));
router.use('/experience', require('./experience'));
router.use('/projects', require('./projects'));

module.exports = router;