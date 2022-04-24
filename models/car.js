const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema =new Schema({
    id: Schema.ObjectId,
    name: {type: String, required: true},
    model: {type: String, required: true},
    color: {type: String, required: true},
    rate: {type: Number, required: true},
    image: {
        data: Buffer,
        contentType: String
    },
    address: {type: String, required: true},
    description: {type: String, required: true}

});

module.exports = mongoose.model("car", CarSchema);
