const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    //mongoDB creates a unique Id for each document
    creatorId: String,
    title: String,
    general:{
        title: String,
        startDate: String,
        endDate: String,
        shortDescription: String,
        projectType: String,
        // type: String, type is a mongoose keyword
        inProgress: Boolean,
    },
    description: String,
    techStack: Object,
    progress: Object,
    members: Object,
    followers: Object,
    gallery: Object,
    links: Object,
});


mongoose.model('Project', ProjectSchema, 'projects');
