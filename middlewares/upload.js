const mongoose = require('mongoose');

const Grid = require('gridfs-stream');
const util = require('util');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const dbConfig = require('../socket/middlewares/database');

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn, mongoose.mongo);
    gfs.collection('cars');
});


var storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-image-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: dbConfig.imgBucket,
            filename: `${Date.now()}-image-${file.originalname}`
        };
    }
});

// var uploadFiles = multer({storage: storage}).array("file", 3);
var uploadFiles = multer({storage: storage}).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;

