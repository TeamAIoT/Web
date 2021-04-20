const express=require('express');
const router=express.Router();

router.get('/list',require('./list'));

module.exports=router;