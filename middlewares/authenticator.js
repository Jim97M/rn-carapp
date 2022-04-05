const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const Remover = require("./functions/deleteImages");

exports.authenticate = async(req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
        bearerToken = bearerHeader.split(' ')[1];
         if(bearerToken === "guest"){
             next();
             return;
         }

         jwt.verify(bearerToken, jwtSecretKey, async(err, data) => {
             if(err){
                 if(req.files){
                     await Remover.RemoveImages(req.files);
                 }
                 res.status(401).json({type: "failure", "result": "You are Logged Out. Kindly Login Again."});
             } else {
                 next();
             }
         });
    } else {
        if(req.files){
            await Remover.RemoveImages(req.files);
        }
        res.status(400).json({ type: "failure", "result": "You are not authorized to make this request"});
    }
}
