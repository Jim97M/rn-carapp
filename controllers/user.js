const User = require('../models/user');
const Jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const Remover = require('./functions/imageResizer');
const JWT_SECRET = process.env.JWT_SECRET;
const roomController = require('./room');

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(errors.errors.length !=0){
            res.status(400).json({type: "failure", "result": errors.errors[0].msg});
            return;
        }else{
            const user =new User(req.body);
            user.image = "assets/users/sample.png";
            user.forgetKey = new Date().getTime();
            user.password = await User.ConvertToHash(user.password);
            const oldUser = await User.findOne({ email: user.email });
            if (oldUser) {
                res.status(400).json({ "type": "failure", "result": "Email already Exist. Choose a Different Email" });
                return;
            }
            user.save(async (err, data) => {
                if (err && err.code === 11000) {
                    const keyName = Object.keys(err.keyValue)[0];
                    const attributeName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
                    res.status(400).json({ "type": "failure", "result": attributeName + " already Exist. Choose a Different " + attributeName });
                } else {
                    const group = await roomController.Get_Group_Room_Detail();
                    const response = await roomController.Add_User_To_Room(group._id, data._id);
                    res.status(200).json({ "type": "success", "result": "User Registered Successfully" });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ "type": "failure", "result": "Server Not Responding" });
    }
}


exports.Signin = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.query.email });
        if (!user) {
            res.status(401).json({ type: "failure", "result": "No User With Such Email Exists" });
        } else {
            const isEqual = await User.isPasswordEqual(req.query.password, user.password);
            if (isEqual) {
                const token = JWT.sign({ username: user.name }, JWT_SECRET_KEY);
                // console.log(req.query.fcmToken);
                await User.findByIdAndUpdate(user._id, { $set: { fcmToken: req.query.fcmToken } });
                // console.log(user);
                res.status(200).json({
                    type: "success", result: "User Login Successfully", token: token,
                    id: user._id,
                    image: user.image,
                    userDetails: user
                });
            } else {
                res.status(401).json({ "type": "failure", "result": "Wrong Password" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "type": "failure", "result": "Server Not Responding" });
    }
};
