const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    dataType: String,
    data: Object,
})

mongoose.model('Data', DataSchema, 'data');
