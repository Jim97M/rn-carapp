const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema =new Schema({
    name: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},

});

module.exports = mongoose.model("car", CarSchema);


