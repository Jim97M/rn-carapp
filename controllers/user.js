const asyncErrorWrapper=require("express-async-handler");
const User=require("../models/user");
const CustomError=require("../Error/CutomError");
const {validateUserInput,comparePassword}=require("../helpers/loginHelpers");


const register=asyncErrorWrapper(async (req,res,next)=>{
    const {email,password,confirmPassword}=req.body;

    if(password !==confirmPassword) {
        return next(new CustomError("Error",401))
    }
    else{
        const user=await User.create({
            email,password,confirmPassword
        });

        return res.status(200)
            .json({
                success:true,
                data:{
                    email:user.email,
                    id:user._id
                }
            })
    }

});

const login=asyncErrorWrapper(async (req,res,next)=>{

    const {email,password}=req.body;

    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your inputs",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!comparePassword(password,user.password)){
        return next(new CustomError("Email Incorrect",400));
    }

    return res.status(200)
        .json({
            success:true,
            data:{
                email:user.email,
                id:user._id
            }
        })

});



module.exports={register,login};