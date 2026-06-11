const express=require("express");
const URL=require("./models/url");
const cookieParser=require("cookie-parser");
const path=require('path');
 const {connectToMongoDb} =require ("./connect");
const app=express();
const staticRoute=require("./routes/staticRouter");
const urlRoute=require("./routes/url");
const userRoute=require("./routes/user");
const PORT=8001;
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth");
connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDb connected"));


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);
 app.get("/url/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                },
            },
        }
    );
    
    res.redirect(entry.redirectURL);
 });
app.listen(PORT,()=> console.log(`Server started at PORT:${PORT}`));
