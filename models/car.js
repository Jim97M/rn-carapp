const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema =new Schema({
    name: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    cloudinary_id: { type: String, required: true}

});

module.exports = mongoose.model("car", CarSchema);


