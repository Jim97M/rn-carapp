const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'assets/');
    },

    filename: function(req, file, cb){
        cb(null, Date.now() +'-'+  file.originalname);
    }
});

exports.upload = multer({
    storage: storage
});

