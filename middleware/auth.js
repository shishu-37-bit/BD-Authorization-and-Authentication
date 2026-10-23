//auth,isStudent,isAdmin

const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{
    try{
        //extract jwt token from cookie

        console.log("cookie",req.cookies.token);
        console.log("body",req.body.token);
        //console.log("header",req.header("Authorization"));
        const token=req.body.token || req.cookies.token|| req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Unauthorized: No token provided'
            });
        }
        //verify the token
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);
            //attach user info to the request object
            req.user=decoded;
        
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:'Unauthorized: Invalid token'
            });
        }
        
            next();
        
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'Unauthorized: Invalid token'
        });
    }
}


exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=='student'){
            return res.status(403).json({
                success:false,
                message:'Forbidden: You are not a student'
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        });
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=='admin'){
            return res.status(403).json({
                success:false,
                message:'Forbidden: You are not an admin'
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        });
    }
}