//const upload = require("../middlewares/ImagesMiddleware");
const Car = require("../models/car");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../Error/CutomError");
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'assets/')
//     },
//     filename: function (req, file, cb) {
//         const filename = Date.now() + "-" + file.originalname;
//         cb(null, filename);
//     }
// });

// const upload = multer({
//     storage: storage
// });


const uploadCar =( upload.single('image'), async (req, res) => {

    try {
  
        //Upload Image
        const result = await cloudinary.uploader.upload(req.file.path);

        const car = new Car({
            name: req.body.name,
            model: req.body.model,
            image: result.secure_url,
            price: req.body.price,
            location: req.body.location,
            cloudinary_id: result.public_id
        });

        await car.save();

        return res.status(200).json({
           car  
        })
        console.log(car);
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

const findById = async(req, res) => {
    try{
       const car = await Car.findById(req.params.id);
       res.json(car);
    }catch(error){
        console.log(err);
    }
}

module.exports={ uploadCar, getCar, findById};
