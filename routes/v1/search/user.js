const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get('/', (req, res) => {
    const searchQuery = req.query.search;
    User.find( { $text: { $search: searchQuery } } ).then((users)=>{
        res.json(users);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
// TODO: implement search algorithms
});

module.exports = router;