const express=require("express");
const app=express();

const {logReqRes}=require("./middlewares");
const {connectMongoDb}= require("./connection");
const userRouter=require("./routes/user");

const PORT=8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=> console.log("MongoDb connected"));
//schema for mongo db data



//middleware
app.use(express.urlencoded({extended:false}));

app.use(logReqRes("log.txt"));
app.use("/api/users",userRouter);


app.listen(PORT,()=>console.log("server started at"+PORT));
