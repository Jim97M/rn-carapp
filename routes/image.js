'use strict';

const express = require('express');

const {upload} = require('../helpers/fileHelper');
const {singleFileUpload, getAllSingleFiles} = require('../controllers/upload');
const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.get('/getSingleFile', getAllSingleFiles);
module.exports = {
    routes: router
}
