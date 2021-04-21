const Board=require("../../models/board");
const verifyJWT=require("../../utils/verifyJWT");

const Comment=(req,res)=>{
    const board_id=req.body.board_id;
    const post_id=req.body.post_id;
    const content=req.body.content;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!board_id || !post_id || !content){
                reject('request body error');
            }
            else{
                resolve();
            }
        });
    }

    const UserCheck=()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const token=req.cookies.token;
                const decoded=await verifyJWT(token);
                resolve(decoded);
            }
            catch(e){
                reject(e);
            }
        });
    }

    const CreateComment=(decoded)=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const board=await Board.findById(board_id);
                const post=board.posts.id(post_id);
                post.comments.push({
                    author:decoded._id,
                    content:content,
                    createdAt:new Date(),
                });
                await board.save();
                resolve();
            }
            catch(e){
                reject(e);
            }
        });
    }

    DataCheck()
    .then(UserCheck)
    .then(CreateComment)
    .then(()=>{
        res.status(200).json({'message':'success'});
    })
    .catch((e)=>{
        console.error(e);
        res.status(500).json(e);
    });
}

module.exports=Comment;