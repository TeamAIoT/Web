const verifyJWT=require('../../utils/verifyJWT');
const Board=require('../../models/board');

const List=(req,res)=>{
    verifyJWT(req.cookies['token'])
    .then(async(decoded)=>{
        const boards=await Board.find();
        res.status(200).json({'message':'success','data':boards});
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

module.exports=List;