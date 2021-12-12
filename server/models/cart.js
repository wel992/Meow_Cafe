var mongoose = require('mongoose');

var carts = new mongoose.Schema({
    id:  Number,
    coffees: [{name: String, quantity: Number}],
    userId: Number,
});

module.exports = mongoose.model("cart",carts);