const Board=require("../../models/board");

const List=(req,res)=>{
    const board_id=req.query.board_id;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!board_id){
                reject('no board_id');
            }
            else{
                resolve();
            }
        });
    }

    const GetPosts=()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                Board.findById(board_id).populate('posts.author').exec((err,data)=>{
                    if(err){
                        reject(err);
                    }
                    const posts=data.posts;
                    resolve(posts.sort((a,b)=>b.createdAt-a.createdAt));
                });
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
        console.error(e);
        res.status(500).json(e);
    });
}

module.exports=List;