const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const CommentSchema=new Schema({
    author: {type:Schema.Types.ObjectId, ref: "User"},
    content: {type:String},
    createdAt: {type:Date},
});

const PostSchema=new Schema({
    author: {type:Schema.Types.ObjectId, ref: "User"},
    title: {type:String},
    content: {type:String},
    createdAt: {type:Date},
    files:[{type: String}],
    comments: [CommentSchema],
});

const BoardSchema=new Schema({
    boardName: {type:String},
    posts:[PostSchema],
});

const Board=mongoose.model("Board",BoardSchema);

module.exports=Board;