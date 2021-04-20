const express=require('express');
const router=express.Router();

router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/file',require('./file'));
router.use('/board',require('./board'));

module.exports=router;