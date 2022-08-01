const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    img: {
       type: String,
    },
    cloudinary_id:{
        type: String,
    }
})

module.exports =  mongoose.model('ImageModel', ImageSchema);