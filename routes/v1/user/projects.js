const { authMiddle } = require('../../../middleware/authMiddle');

const router = require('express').Router();

router.get('/',authMiddle, (req, res)=>{
    const user = req.authProp.user;
    res.send(user.projects);
    // TODO: handle projects in project databse
});

module.exports = router;