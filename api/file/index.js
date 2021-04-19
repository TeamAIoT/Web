const express=require('express');
const router=express.Router();

router.get('/download',require('./download'));

module.exports=router;