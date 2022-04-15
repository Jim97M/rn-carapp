const fs = require('fs');
const sharp = require('sharp');

exports.ResizeImage = async (path, images) => {
    const destinationPath = "assets/" + path + "/";
    if(!fs.existsSync(destinationPath)){
        fs.mkdirSync(destinationPath);
    }

    var files = [];
    await images.forEach((image) => {
        const filePath = "assets/" + image.filename;
        const destinationFilename = destinationPath + image.filename;
        files.push(destinationFilename);
        const process = sharp(filePath).resize({height: 300, width: 300}).withMetadata().toFile(destinationFilename);
        sharp.cache({files: 0});
        if(process){
            fs.unlinkSync(filePath);
        } else {
            res.json({type: "failure", result: "Server not responding. Try Again"})
        }
    });
    return files;
} 


exports.RemoveImages = async (files) => {
 await files.forEach((image) => {
     const filePath = "assets/" + image.filename;
     fs.unlinkSync(filePath);
 });
}