const crypto=require('crypto');
const User=require('../../models/user');

const Login=(req,res)=>{
    const userId=req.body.userId;
    const password=req.body.password;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!userId || !password){
                reject();
            }
            else{
                resolve();
            }
        });
    }

    const GetUserInfo=()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const users=await User.find({userId:userId});
                if(user.length===0){
                    reject();
                }
                else{
                    resolve(user[0]);
                }
            }
            catch(e){
                reject(e);
            }
        });
    }

    const CheckPassword=(user)=>{
        return new Promise((resolve,reject)=>{
            const key=crypto.pbkdf2Sync(password,user.salt,process.env.REPEAT_NUM,64,'sha512');
            if(key.toString('base64')===user.hashedPassword){
                resolve(user);
            }
            else{
                reject();
            }
        });
    }

    const JWTUpdate=(user)=>{
        return new Promise((resolve,reject)=>{
            const token=user.generateToken();
            res.cookie("token",token);
            resolve();
        });
    }

    DataCheck()
    .then(GetUserInfo)
    .then(CheckPassword)
    .then(JWTUpdate)
    .then(()=>{
        res.status(200).json({message:'success'});
    })
    .catch((e)=>{
        console.error(e);
        res.status(500).json({message:e});
    });
}



module.exports=Login;