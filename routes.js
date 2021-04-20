const fs=require('fs');
const ejs=require('ejs');
const express=require('express');
const axios=require('axios');
const verifyJWT=require('./utils/verifyJWT');
const router=express.Router();

const Board=require('./models/board');
const User=require('./models/user');

router.get('/',(req,res)=>{
    res.redirect('/main');
});

router.get('/login',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/login.html');
        res.end(data);
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/main',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/main.html');
        res.end(data);
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/signup',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/signup.html');
        res.end(data);
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/board/:board_id/post/:post_id',async (req,res)=>{
    try{
        const data=fs.readFileSync('./views/post.html');
        res.end(data);
    }
    catch(e){
        res.status(500).end(e);
    }
});

router.get('/board/:board_id',(req,res)=>{
    try{
        const data=fs.readFileSync('./views/board.html');
        res.end(data);
    }
    catch(e){
        res.status(500).end(e);
    }
});


module.exports=router;