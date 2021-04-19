const File=require('../../models/file');
const fs=require('fs');
const verifyJWT=require('../../utils/verifyJWT');

const Download=(req,res)=>{
    const file_id=req.body.file_id;
    
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!board_id || !post_id || !file_id){
                reject();
            }
            else{
                resolve(res.cookies['token']);
            }
        });
    }

    const MakeStream=(decoded)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const file=await File.findById(file_id);
                if(file.owner !== decoded._id && decoded.admin === false){
                    reject();
                }
                else{
                    const rs=fs.createReadStream(file.path);
                    rs.pipe(res);
                }
            }
            catch(e){
                reject(e);
            }
        });
    }
    DataCheck()
    .then(verifyJWT)
    .then(MakeStream)
    .catch((e)=>{
        res.status(500).json(e);
    });
}

module.exports=Download;