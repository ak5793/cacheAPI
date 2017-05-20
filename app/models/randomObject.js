// app/models/randomObject.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RandomObjectSchema = new Schema({
    name: String
});

module.exports = mongoose.model('RandomObject', RandomObjectSchema);
