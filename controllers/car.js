//const upload = require("../middlewares/ImagesMiddleware");
const Car = require("../models/car");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../Error/CutomError");
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage
});


const uploadCar =( upload.single('image'), async (req, res, next) => {

    const {name, model, image, price, location, cloudinary_id} = req.body;
    try {
  
        //Upload Image
        const result = await cloudinary.uploader.upload(req.file.path);

        const car = Car.create({
            name,
            model,
            image,
            price,
            location,
            cloudinary_id
        })

        return res.status(200).json({
            success: True,
            data: {
                model: car.model
            }
        })
    } catch (error) {
       res.status(400).send("Client Client Error");
    }
});


const getCar = async (req, res, next) => {
    const {name, model, price, image, location, cloudinary_id} = req.body;
    try{
        const car = await Car.find()
        res.status(200).json(car);
    }catch(err){
       res.status(500).json(err);
    }
}
module.exports={uploadImage, uploadCar, getCar};
