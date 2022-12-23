const userRouter = require('express').Router();
const aud = require('../../../config/aud').aud;
const utils = require('../../../utils/userUtils');
const { getIdPass } = require('../../../utils/decodeUtils');
const {getDriver} = require('../../../config/neo4j');
const { AuthService } = require('../../../services/auth.service');

userRouter.get('/', function (req, res) {
    res.send('No Get Request')
})


userRouter.post('/', async (req, res) =>{
    const { email, password } = getIdPass(req);
    const newUserObj = utils.createNewUser(email, password);

    const driver = getDriver()
    const authService = new AuthService(driver)

    const output = await authService.register(newUserObj).then((user) => {
        return user.properties
    }).catch((error) => {
        console.log(error);
        res.json({ success: false, msg: 'Email already exists' });
    });

    if(output){
        await authService.setJWTCookie(output, res);
    }
    // const newUser = new User(newUserObj);

    // User.findOne({ email: email }).
    //     then((user) => {
    //         if (!user) {
    //             newUser.save().then(async (user) => {
    //                 // const emailjwt = utils.issueJWT(user);
    //                 // const url = `http://localhost:5000/user/verify/confirmation/${emailjwt.token}`
    //                 // console.log(emailjwt.token)
    //                 // SendMail({ url: url })
    //                 await setJWTCookie(user, res);
    //             });
    //         }
    //         else if (!!user && !user.emaiConfirmed && !user.phoneConfirmed) {
    //             user.delete();
    //             newUser.save()
    //                 .then(async (user) => {
    //                     // const emailjwt = utils.issueJWT(user, 'email');
    //                     // const url = `http://localhost:5000/user/verify/confirmation/${emailjwt.token}`
    //                     // SendMail({ url: url })
    //                     await setJWTCookie(user, res);

    //                 });
    //         }
    //         else {
    //             res.json({ success: false, msg: 'Email already exists' })

    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //         return res.status(401).json({ success: false, msg: "Could not connect" });
    //     });
})



module.exports = userRouter;