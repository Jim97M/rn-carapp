'use strict'
const SingleFile = require('../models/image')
const MultipleFile = require('../models/multipleImages');
const singleFileUpload = async (req, res, next) => {
    try {
      const file = new SingleFile({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2)
      });
      await file.save();
      console.log(file);
      res.status(201).send('File Uploaded Successfully');
    } catch (error) {
       res.status(400).send(error.message);
    }
}

const multipleFileUpload = async (req, res, next) => {
   try{
        let filesArray = [];
        req.files.forEach(element => {
          const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2)
          }
          filesArray.push(file);
        });
     const multipleFiles = new MultipleFile({
         title: req.body.title,
         files: filesArray
     });

     await multipleFiles.save();
     res.status(201).send('Files Uploaded');
   }catch(error){
    res.status(400).send(error.message);
   }
}


const getAllSingleFiles = async (req, res, next) => {
   try{
      const files = await SingleFile.find();
      res.status(200).send(files);
   }catch(error){
       res.status(400).send(error.message);
   }
}

const fileSizeFormatter = (bytes, decimal) => {
   if(bytes === 0){
    return '0 Bytes';
   }

   const dm = decimal || 2;
   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
   const index = Math.floor(Math.log(bytes) / Math.log(1000));
   return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];
}

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getAllSingleFiles
}