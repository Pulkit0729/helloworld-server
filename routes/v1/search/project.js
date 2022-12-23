const router = require("express").Router();
const mongoose = require("mongoose");
const Project = mongoose.model("Project");

router.get('/', (req, res) => {
    const searchQuery = req.query.search;
    Project.find( { $text: { $search: searchQuery } } ).then((projects)=>{
        res.json(projects);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })

});

module.exports = router;