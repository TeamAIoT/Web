const express=require('express');
const router=express.Router();

router.get('/download/:file_id',require('./download'));

module.exports=router;