const express=require('express');
const router=express.Router();

router.get('/list',require('./list'));
router.post('/create',require('./create'));
router.post('/comment',require('./comment'));

module.exports=router;