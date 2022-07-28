const express = require('express');
const router = express.Router();
const multer = require('multer');
const ImageModel = require('../models/image');



const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage: Storage
}).single('testImage');


router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            console.log(err);
        }
        else{
            const newImage =  ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            newImage.save().then(() => res.send("Successfully Send")).catch((err) => console.log(err));
        }
    })
})

router.get('/getimage', async (req, res) => {
   const allData = await ImageModel.find();
   res.json(allData)
})

module.exports = router;