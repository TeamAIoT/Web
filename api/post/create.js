const Board=require("../../models/board");
const User=require('../../models/user');
const multer=require("multer");
const verifyJWT=require('../../utils/verifyJWT');

const Create=(req,res)=>{
    const title=req.body.title;
    const content=req.body.content;
    const file=req.file;
    const board_id=req.body.board_id;
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!title || !content || !board_id){
                reject();
            }
            else{
                resolve(req.cookies['token']);
            }
        });
    }

    const AuthorityCheck=(decoded)=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const user=await User.findById(decoded._id);
                if(!board_id in user.accessToBoard){
                    reject();
                }
                else{
                    resolve(decoded);
                }
            }
            catch(e){
                reject(e);
            }
        });
    }

    const GetBoard=(decoded)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const board=await Board.findById(board_id);
                resolve(decoded,board);
            }
            catch(e){
                reject(e);
            }
        });
    }

    const CreatePost=(decoded,board)=>{
        return new Promise(async (resolve,reject)=>{
            if(!file){
                board.posts.push({
                    author:decoded._id,
                    title:title,
                    content:content,
                    createdAt:new Date().getTime(),
                    comments:[],
                });
            }
            else{
                board.posts.push({
                    author:decoded._id,
                    title:title,
                    content:content,
                    createdAt:new Date().getTime(),
                    files:{fileName:file.filename},
                    comments:[],
                });
            }
        });
    }

    DataCheck()
    .then(verifyJWT)
    .then(AuthorityCheck)
    .then(GetBoard)
    .then(CreatePost)
    .then(()=>{
        res.status(200).json({'message':'success'});
    })
    .catch((e)=>{
        res.status(500).json(e);
    });

}

module.exports=Create;