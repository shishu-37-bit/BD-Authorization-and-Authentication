const bcrypt=require('bcrypt');
const User=require('../models/User');
const jwt=require("jsonwebtoken");
require('dotenv').config();


exports.signup=async(req,res)=>{
    try{
           const {name,email,password,role}=req.body;
           const existngUser=await User.findOne({email});

           if(existngUser){
            return res.status(400).json({
                success:false,
                message:'user already exists',
            });
           }
           //secure password
           let hashedPassword;
           try{
                hashedPassword=await bcrypt.hash(password,10);
           }
           catch(err){
            return res.status(500).json({
                success:false,
                message:'error in hashing Password',
            });
           }

           //create entry for user

           const user=await User.create({
            name,email,password:hashedPassword,role
           })
           return res.status(200).json({
            success:true,
            message:'User Created Successfully',
           })
    }
    catch(err){
             console.error(err);
             return res.status(500).json({
                success:false,
                message:'User Cannot registered,Please try again later',
             })
    }
}


exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:'Please fill all detail carefully'
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user is not registered'
            });
        }
        //verify password and generate jwt token
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        };

        if(await bcrypt.compare(password,user.password)){
                //password matches
                let token=jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:'2h',
                });

                user.token=token;
                user.password=undefined;

                const options={
                    expires:new Date(Date.now()+3000),
                    httpOnly:true,
                }

                res.cookie('token',token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:'User logged in successfully'
                });
        }
        else{
            return res.status(403).json({
                success:false,
                message:'Password incorrect'
            })
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Error occurred while logging in'
        })
    }
}