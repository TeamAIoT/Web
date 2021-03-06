const mongoose=require("mongoose");
const crypto=require('crypto');
const jwt=require("jsonwebtoken");

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    userId: {type: String},
    name: {type: String},
    email: {type: String},
    hashedPassword: {type: String},
    salt: {type: String},
    admin: {type: Boolean, default: false},
    accessToBoard: [{type:Schema.Types.ObjectId, ref: "Board"}]
},{
    collection:"User"
});

UserSchema.methods.generateToken=function(){
    const token=jwt.sign({
        _id: this._id,
        userId: this.userId,
        admin:this.admin,
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d",
    }
    );
    return token;
}

const User=mongoose.model("User",UserSchema);

module.exports=User;