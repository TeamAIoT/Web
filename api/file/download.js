const File=require('../../models/file');
const fs=require('fs');
const verifyJWT=require('../../utils/verifyJWT');

const Download=(req,res)=>{
    const file_id=req.params.file_id;
    
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!file_id){
                reject('request body error');
            }
            else{
                resolve(req.cookies['token']);
            }
        });
    }

    const MakeStream=(decoded)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const file=await File.findById(file_id);
                if(file.owner !== decoded._id && decoded.admin === false){
                    reject('권한이 없습니다.');
                }
                else{
                    const rs=fs.createReadStream(file.path);
                    res.download(file.path,file.fileName.substring(14,file.fileName.length));
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
        console.error(e);
        res.status(500).json(e);
    });
}

module.exports=Download;