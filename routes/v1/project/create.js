const router = require('express').Router();
const {authMiddle} = require('../../../middleware/authMiddle');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');

router.get('/', (req, res)=>{
    res.sendStatus(403);
});

router.post('/',authMiddle, (req, res)=>{
    const user = req.authProp.user;
    const projectData = JSON.parse(req.body.projectData);
    const project = new Project(projectData);
    if(user.projects[project._id]!=undefined){
        res.sendStatus(409)
    }else{
    project.save().then((project) => {
        const projectId= project._id;
        if(user.projects==undefined) {
            user.projects={};
        }
        user.projects[projectId] = project.general;
        User.updateOne({email:user.email}, {$set :{projects:user.projects}}).then(()=>{
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });
   //TODO : Completed one database but error in another
    }
})

module.exports = router;