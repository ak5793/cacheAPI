// app/models/randomObject.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RandomObjectSchema = new Schema({
        name: String,
        createdAt: { type: Date, expires: '5m', default: Date.now }});
module.exports = mongoose.model('RandomObject', RandomObjectSchema);
