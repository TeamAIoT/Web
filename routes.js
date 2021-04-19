const fs=require('fs');
const ejs=require('ejs');
const express=require('express');
const axios=require('axios');
const verifyJWT=require('./utils/verifyJWT');
const router=express.Router();

const Board=require('./models/board');
const User=require('./models/user');

router.get('/login',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/login.ejs');
        res.send(ejs.render(data.toString(),{}));
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/main',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/main.ejs');
        res.end(ejs.render(data.toString(),{}));
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/signup',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/signup.ejs');
        res.end(ejs.render(data.toString(),{}));
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/board/:board_id/post/:post_id',async (req,res)=>{
    const post=await axios.get(`http://localhost:${process.env.SERVER_PORT}/api/post/detail?board_id=${board_id}&post_id=${post_id}`).data.data;
    const user=await User.findById(await verifyJWT(req.cookies['token'])._id);
    const data=fs.readFileSync('./views/post.ejs');
    res.status(200).header('content-type','text/html');
    res.end(ejs.render(data,{post:post}));
});

router.get('/board/:boardId',(req,res)=>{

});


module.exports=router;