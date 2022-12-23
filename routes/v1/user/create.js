const { aud } = require('../../../config/aud');
const utils = require('../../../utils/userUtils')
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/', (req, res) => {
    const Cookies = req.cookies;
    const jwt = Cookies.jwt;
    const verify = utils.verifyToken(jwt, aud.pending);
    if (!!jwt && verify.status) {
        const { fname, lname, dob } = req.body;
        User.updateOne({ _id: verify.sub }, {
            $set: {
                fname: fname,
                lname: lname,
                personalInfo: { dob: dob }
            }
        }).then(
            res.status(200).json({ success: true })
        ).catch(err => {
            console.log(err);
            res.status(201).send({ auth: true, msg: 'Invalid data', success: false });
        });
    }
    else {
        console.log('not verified');
        res.status(403).json({ auth: false, msg: 'Token not verified', success: false })
    }
});

module.exports = router;