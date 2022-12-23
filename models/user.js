const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    receiver:String,
    lastModified: String,
    lastMessage: String,
    messages:Array,
});
const UserSchema = new mongoose.Schema({
    //mongoDB creates a unique Id for each user
    fname: String,
    lname: String,
    email: String,
    phone: String,
    personalInfo: {
        bio:String,
        dob: Object,
        location: String,
        iam: String,
        programmerType: String
    },
    conversations: [ConversationSchema],
    photo: String,
    salt: String,
    hash: String,
    emailConfirmed:Boolean,
    phoneConfirmed:Boolean,
    token: String,
    expire: String,
    keyPair:Object,
    skills: [],
    interest: Object,
    projects: Object,
    connections: Object,
    experiences: Object,
    groups: Object,
    theme:String,
    posts: Object,
});

mongoose.model('User', UserSchema, 'users');
