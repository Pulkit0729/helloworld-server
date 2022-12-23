const { authMiddle } = require('../../../middleware/authMiddle');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendStatus(403);
})

router.post('/', authMiddle, (req, res) => {
    const user = req.authProp.user;
    const messageData = JSON.parse(req.body.messageData);
    const receiver = messageData.receiver;

    User.findById(user.id).then((user) => {
        let conversations = user.conversations;
        var i = 0;
        if (conversations.length == 0) {
            console.log();
            user.conversations= [{ receiver: receiver, messages: [messageData], lastModified: messageData.time, lastMessage: messageData.data }];
        }
        while (i < conversations.length) {
            if (conversations[i].receiver == receiver) {
                console.log('reached');
                let messages = user.conversations[i].messages;
                messages.push(messageData);
                user.conversations[i].messages  = messages;
                break;
            }
            i++;
            if (i == conversations.length) {
                user.conversations.push({ receiver: receiver, messages: [messageData], lastModified: messageData.time, lastMessage: messageData.data });
            }
        }
        user.save().then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });
})
module.exports = router;
