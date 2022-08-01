const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const ImageModel = require('../models/image');



// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     },
// });

// const upload = multer({
//     storage: Storage
// }).single('testImage');


// router.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             const newImage =  ImageModel({
//                 name: req.body.name,
//                 image: {
//                     data: req.file.filename,
//                     contentType: 'image/png'
//                 }
//             })
//             newImage.save().then(() => res.send("Successfully Send")).catch((err) => console.log(err));
//         }
//     })
// })

router.post('/upload', upload.single('image'), async (req, res) => {
   try{
     const result = await cloudinary.uploader.upload(req.file.path);

     //Create New User
     let newImage = new ImageModel({
        name: req.body.name,
        img: req.body.img,
        cloudinary_id: result.public_id,
     });

     //Save User
     await newImage.save();
     res.json(newImage);
   }catch(err){
       console.log(err);
   }
});

router.get('/getimage', async (req, res) => {
   const allData = await ImageModel.find();
   res.json(allData)
})

module.exports = router;