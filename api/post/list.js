const Board=require("../../models/board");

const List=(req,res)=>{
    const board_id=req.body.board_id;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!board_id){
                reject();
            }
            else{
                resolve();
            }
        });
    }

    const GetPosts=()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const posts=await Board.findById(board_id).posts;
                resolve(posts.sort({createdAt:-1}));
            }
            catch(e){
                reject(e);
            }
            
        });
    }

    DataCheck()
    .then(GetPosts)
    .then((posts)=>{
        res.status(200).json({'message':'success','data':posts});
    })
    .catch((e)=>{
        res.status(500).json(e);
    });
}

module.exports=List;