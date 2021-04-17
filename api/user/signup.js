const crypto=require('crypto');
const User=require('../../models/user');

const SignUp=(req,res)=>{
    const userId=req.body.userId;
    const password=req.body.password;
    const name=req.body.name;
    const email=req.body.email;

    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!userId || !password || !name || !email){
                reject();
            }
            else{
                resolve();
            }
        });
    }

    const UserCheck=()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const users=await User.find({userId:userId});
                if(users.length!==0){
                    reject();
                }
                else{
                    resolve();
                }
            }
            catch(e){
                reject(e);
            }
        });
    }

    const GetSalt=()=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(64,(err,buf)=>{
                if(err){
                    throw err;
                }
                else{
                    const key=crypto.pbkdf2Sync(password,buf.toString("base64"),process.env.REPEAT_NUM,64);
                    resolve(buf.toString("base64"),key.toString("base64"));
                }
            });
        });
    }

    const CreateUser=(salt,hashedPassword)=>{
        return new Promise(async (reslove,reject)=>{
            const user=new User({
                userId:userId,
                hashedPassword:hashedPassword,
                salt:salt,
                email:email,
                name:name
            });
            await user.save();
        });
    }

    DataCheck()
    .then(UserCheck)
    .then(GetSalt)
    .then(CreateUser)
    .then(()=>{
        res.status(200).json({message:"Complete Sign Up"});
    })
    .catch((e)=>{
        console.error(e);
        res.status(500).json({message:e});
    });
}

module.exports=SignUp;