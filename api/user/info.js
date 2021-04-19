const verifyJWT=require('../../utils/verifyJWT');

const Info=(req,res)=>{
    verifyJWT(req.cookies['token'])
    .then((decoded)=>{
        res.status(200).json({'message':'success','data':decoded});
    })
    .catch((e)=>{
        res.status(500).json(e);
    });
}

module.exports=Info;