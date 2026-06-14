const express=require("express");
 const userRoute=require("./routes/user");
  const blogRoute=require("./routes/blog");
 const cookieParser=require("cookie-parser");

 const Blog=require("./models/blog");
const app=express();
const path=require("path");
const PORT=8000;
const mongoose=require("mongoose");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
mongoose.connect("mongodb://localhost:27017/blogify").then((e)=>console.log("MongoDb Connected"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({});
    console.log(allBlogs);
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
});
app.use("/user",userRoute);
app.use("/blog",blogRoute);
app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`));

