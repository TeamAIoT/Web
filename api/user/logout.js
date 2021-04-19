const Logout=(req,res)=>{
    const DoLogout=()=>{
        return new Promise((resolve,reject)=>{
            try{
                res.clearCookie("token");
                resolve();
            }
            catch(e){
                reject(e);
            }
        });
    }
    DoLogout()
    .then(()=>{
        res.status(200).json({'message':'success'});
    })
    .catch((e)=>{
        res.status(500).json(e);
    });
}

module.exports=Logout;