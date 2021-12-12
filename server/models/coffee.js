var mongoose = require('mongoose');

var coffees = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    describe: String,
    categoryId: Number,
    imageUrl: String
});

module.exports = mongoose.model("coffees",coffees);