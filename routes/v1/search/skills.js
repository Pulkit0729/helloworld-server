const router = require('express').Router();
const mongoose = require("mongoose");
const Data = mongoose.model("Data");
const checkSubStr = require("../../../utils/checkSubStr");

router.get('/',  (req, res)=>{
    const searchQuery = req.query.search;
    Data.findOne({dataType:'Skills'}).
    then(doc=>{
        const skills = SearchSkills(searchQuery, doc);
        res.json({skills});
    }).
    catch(err =>{
        console.log(err);
        res.sendStatus(500);
    })
});


function SearchSkills(search, doc){
    const skills = doc.data.list;
    const result =[];
    for( var i = 0; i < skills.length; i++ ){
        if(checkSubStr(search, skills[i].title)!=-1){
            result.push(skills[i]);
        }
    }
    return result;
}


module.exports = router;
