const Board=require('../../models/board');
const User=require("../../models/user");
const verifyJWT=require('../../utils/verifyJWT');

const Edit=(req,res)=>{
    const board_id=req.body.board_id;
    const title=req.body.title;
    const post_id=req.body.post_id;
    const content=req.body.content;
    // const file=req.file;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!title || !board_id || !post_id || !content){
                reject();
            }
            else{
                resolve(res.cookies['token']);
            }
        });
    }

    const AuthorityCheck=(decoded)=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const post=await Board.findById(board_id).posts.id(post_id);
                if(post.author!==decoded._id){
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

    const UpdatePost=(decoded,board)=>{
        return new Promise(async (resolve,reject)=>{
            try{
                await board.posts.update({_id:post_id},{title:title,content:content});
                await board.save();
                resolve();
            }
            catch(e){
                reject(e);
            }
        });
    }

    DataCheck()
    .then(verifyJWT)
    .then(AuthorityCheck)
    .then(GetBoard)
    .then(UpdatePost)
    .then(()=>{
        res.status(200).json({message:'success'});
    })
    .catch((e)=>{
        res.status(500).json(e);
    })

}

module.exports=Edit;