const mongoose = require('mongoose');
const utils = require('../utils/userUtils');
const User = mongoose.model('User');
const {aud} = require('../config/aud');


module.exports.authMiddle = async (req, res, next) =>{
    const Cookies = req.cookies;
    const jwt = Cookies.jwt;
    const verify = utils.verifyToken(jwt, aud.session);
    if(!!jwt && verify.status){
        await User.findById(verify.sub).then(user => {
            if(user.token===jwt) {
                console.log('verified');
                req.authProp = {auth: true, user: user}
                next();
            }else{
                console.log('token expired or invalid');
                res.status(401).json({auth: false, msg: 'Token expired or invalid'});
            }
        }).catch((err) => {
            console.log(err);
            res.status(401).send({auth: false, msg: 'Token expired or invalid'});
        })
    }else{
        console.log('not verified');
        res.status(401).json({auth:false, msg: 'Token not verified'})
        }
}

