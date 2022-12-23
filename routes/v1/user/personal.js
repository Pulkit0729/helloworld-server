const personalRouter = require('express').Router();
const authForAnyAudMiddle = require('../../../middleware/authForAnyAudMiddle').authForAnyAudMiddle;
const mongoose = require('mongoose');
const User = mongoose.model('User');

personalRouter.get('/',authForAnyAudMiddle ,(req, res) => {
    const authProp = req.authProp;
    res.send(authProp.user);
});

personalRouter.put('/', authForAnyAudMiddle ,(req, res) => {
    const user = req.authProp.user;
    const data = req.body.personalInfo;
    const personalInfo = user.personalInfo;
    for (const [key, value] of Object.entries(data)){
        personalInfo[key] = value;
    }

    User.updateOne({_id: user._id}, {$set: {personalInfo: personalInfo}}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})
module.exports = personalRouter;