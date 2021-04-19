const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const app=express();
require('dotenv').config();

const {SERVER_PORT,MONGO_URL}=process.env;

mongoose
    .connect(MONGO_URL,{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((e)=>{
        console.error(e);
    });


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use('/js',express.static('./static/js'));
app.use('/css',express.static('./static/css'));
app.use('/api',require('./api'));

app.listen(process.env.SERVER_PORT,()=>{
    console.log('Sever is running on port '+process.env.SERVER_PORT);
});