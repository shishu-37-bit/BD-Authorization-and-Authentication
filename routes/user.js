const express = require("express");
const router = express.Router();

const{login,signup}=require('../controllers/Auth');
const{auth,isStudent,isAdmin}=require('../middleware/auth');

router.post('/login',login);
router.post('/signup',signup);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to test route',
    });
});

//protected route

router.get("/student" ,auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to student route',
    });
});

router.get("/admin" ,auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to admin route',
    });
});

module.exports=router;