var mongoose = require('mongoose');

var orders = new mongoose.Schema({
    id:  Number,
    time: Date,
    coffees: [{name: String, quantity: Number}],
    feedback: String,
    userId: Number,
    total: Number
});

module.exports = mongoose.model("orders",orders);