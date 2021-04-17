const express=require('express');
const router=express.Router();

router.post('/upload',require('./upload'));
router.get('/download',require('./download'));

module.exports=router;