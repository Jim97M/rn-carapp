const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema =new Schema({
    brandname: {type: String, required: true},
    model: {type: String, required: true},
    color: {type: String, required: true},
    rate: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true}

});

module.exports = mongoose.model("car", CarSchema);


