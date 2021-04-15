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

    const getUserInfo=()=>{
        return new Promise((resolve,reject)=>{

        });
    }
}

module.exports=Login;