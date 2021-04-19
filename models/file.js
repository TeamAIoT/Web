const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const FileSchema=new Schema({
    fileName: {type: String},
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    path: {type: String},
});

const File=mongoose.model("File",FileSchema);

module.exports=File;