const router = require('express').Router();
const mongoose = require('mongoose');
const { authMiddle } = require('../../../middleware/authMiddle');
const Project = mongoose.model('Project');
const projectUtils = require('../../../utils/projectUtils');

router.get('/', (req, res)=>{
    const projectId = req.query.projectId;
    Project.findById(projectId).then((project) => {
        if (!project) {
            res.sendStatus(404);
        } else {
            res.send(project.techStack);
        }
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.post('/',authMiddle, (req, res) => {
    const projectId = req.query.projectId;
    const techStack = JSON.parse(req.body.techStack);
    const user = req.authProp.user;
    projectUtils.updateProject(projectId, {type:'techStack', data:techStack}, user).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })});


router.put('/', (req, res) => {
    const projectId = req.query.projectId;
    const techStack = JSON.parse(req.body.techStack);
    const user = req.authProp.user;
    projectUtils.updateProject(projectId, {type:'techStack', data:techStack}, user).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })});

module.exports = router;