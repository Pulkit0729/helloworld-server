const { authMiddle } = require('../../../middleware/authMiddle');
const authForAnyAudMiddle = require('../../../middleware/authForAnyAudMiddle').authForAnyAudMiddle;

const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = require('express').Router();

router.get('/',authMiddle, (req, res)=>{
    const user = req.authProp.user;
    res.send(user.skills);
});

router.post('/',authForAnyAudMiddle, (req, res)=>{
    const data = req.body.skills;
    //todo: validate DATA
    const user = req.authProp.user;
    console.log( req.body);
    User.updateOne({_id: user._id}, {$set :{skills:data}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;