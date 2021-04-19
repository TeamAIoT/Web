const express=require('express');
const multer=require('multer');
const router=express.Router();
const storage=multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'files');
    },
    filename: function(req,file,callback){
        callback(null,(new Date().getTime()))
    }
});
const upload=multer({storage:storage});

router.get('/list',require('./list'));
router.post('/create',upload.single('file'),require('./create'));
router.post('/comment',require('./comment'));
router.post('/edit',require('./edit'));
router.get('/detail',require('./detail'));

module.exports=router;