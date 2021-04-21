const Board=require('../../models/board');

const Detail=(req,res)=>{
    const board_id=req.query.board_id;
    const post_id=req.query.post_id;
    
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!board_id || !post_id){
                reject('request body error');
            }
            else{
                resolve();
            }
        });
    }

    const GetDetail=()=>{
        return new Promise((resolve,reject)=>{
            try{
                Board.findById(board_id).populate('posts.file').populate('posts.author').populate('posts.comments.author').exec(async(err,data)=>{
                    if(err){
                        throw err;
                    }
                    resolve(await data.posts.id(post_id));
                });
            }
            catch(e){
                reject(e);
            }
        });
    }

    DataCheck()
    .then(GetDetail)
    .then((data)=>{
        res.status(200).json({'message':'success','data':data});
    })
    .catch((e)=>{
        console.error(e);
        res.status(500).json(e);
    });
}

module.exports=Detail;