const express=require('express');
const router=express.Router();

router.post('/login',require('./login'));
router.post('/signup',require('./signup'));
router.post('/logout',require('./logout'));

module.exports=router;