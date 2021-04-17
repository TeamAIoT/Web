const jwt=require('jsonwebtoken');

const verifyJWT=(token)=>{
    return new Promise((resolve,reject)=>{
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            resolve(decoded);
        }
        catch(e){
            reject(e);
        }
    });
}

module.exports=verifyJWT;