var mongoose = require('mongoose');

var users = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    phoneNum: Number,
    orders: [Number]
});

module.exports = mongoose.model("users",users);