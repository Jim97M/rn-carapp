//const upload = require("../middlewares/ImagesMiddleware");
const Car = require("../models/car");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../Error/CutomError");
const fs = require("fs");
const path = require("path");

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

const uploadImage = asyncErrorWrapper(upload.single('image'), async (req, res, next) => {
    var obj = {
        brandname: req.body.name,
        model: req.body.model,
        color: req.body.color,
        rate: req.body.rate,
        address: req.body.address,
        description: req.body.description,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/assets' + req.file.filename)),
            contentType: 'image/png'
        },
  
    }
    
    await Car.create(obj, (err, item) => {
        if(err){
            return next(new CustomError("Error", 401))
        }else{
            res.redirect('/');
        }
    })
    
  }
    )


module.exports={uploadImage};
