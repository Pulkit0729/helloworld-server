const { authMiddle } = require('../../../middleware/authMiddle');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const projectUtils = require('../../../utils/projectUtils');

const router = require('express').Router();

router.get('/', authMiddle, (req, res) => {
    const projectId = req.query.projectId;
    Project.findById(projectId).then((project) => {
        if (!project) {
            res.sendStatus(404);
        } else {
            res.send(project.general);
        }
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.put('/', authMiddle, (req, res) => {
    const projectId = req.query.projectId;
    const generalData = JSON.parse(req.body.generalData);
    const user = req.authProp.user;
    projectUtils.updateProject(projectId, {type:'general', data:generalData}, user).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })});

module.exports = router;