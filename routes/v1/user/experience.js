const { authMiddle } = require('../../../middleware/authMiddle');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = require('express').Router();

router.get('/:expId', authMiddle, (req, res) => {
    const expId = req.params.expId;
    const user = req.authProp.user;
    if (user.experiences!=undefined && user.experiences[expId] != undefined) {
        res.send(user.experiences[expId]);
    } else res.sendStatus(404);
});

router.post('/', authMiddle, (req, res) => {
    const experience = JSON.parse(req.body.experience);
    const expId = experience.expId;
    const user = req.authProp.user;
    let experiences = user.experiences;
    if (experiences == undefined) {
        experiences[expId] = experience
    } else {
        experiences[experience.expId] = experience;

    }
    User.updateOne({ _id: user._id }, { $set: { experiences: experiences } }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.delete('/:expId', authMiddle, (req, res)=>{
    const expId = req.params.expId;
    const user = req.authProp.user;
    if (user.experiences!=undefined && user.experiences[expId] != undefined) {
        let experiences = user.experiences;
        delete experiences[expId];
        User.updateOne({_id:user._id}, {$set:{experiences:experiences}}).then(()=>{
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(404);
        })
    } else res.sendStatus(404);
})

module.exports = router;