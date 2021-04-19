const Board=require('../../models/board');

const Detail=(req,res)=>{
    const board_id=req.query.board_id;
    const post_id=req.query.post_id;
    
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!board_id || !post_id){
                reject();
            }
            else{
                resolve();
            }
        });
    }

    const GetDetail=()=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const board=Board.findById(board_id);
                const post=board.posts.id(post_id);
                const data=await post.populate('file');
                resolve(data);
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
        res.status(500).json(e);
    });
}

module.exports=Detail;