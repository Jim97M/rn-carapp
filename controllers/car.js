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


const uploadCar = async (req, res) => {

    try {
    const {name, model, price, location, description} = req.body;
        const car = await Car.create({
            name,
            model,
            price,
            location,
            description
        });

        return res.status(200).json({
          success: true,
          data: {
            car: car.name,
            car: car.model,
            car: car.price, 
            car: car.location,
            car: car.description
          }
        })
    
    } catch (error) {
       res.status(400).send("Client Client Error");
    }
};

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
