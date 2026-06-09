const express=require("express");
const app=express();
const fs=require("fs");
const mongoose=require("mongoose");
const PORT=8000;

//connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("MongoDb connected"))
.catch((err)=> console.log("Mongo Error",err));
//schema for mongo db data
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,

    },
    gender:{
        type:String,
    },


},{timestamps:true});
const User=mongoose.model("user",userSchema);


//middleware
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now()}:${req.ip} ${req.method}: ${req.path} /n`,(err,data)=>{
        next();
    })
});
app.use((req,res,next)=>{
    req.myUserName="joy";
    console.log("Hello from middleware",req.myUserName);
    next();
});

app.get("/api/users",async(req,res)=>{
    const allDbUsers=await User.find({});
   
    return res.json(allDbUsers);
});
app.route("/api/users/:id")

.get(async(req,res)=>{
   const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"User not found"});
    return res.json(user);
}).patch(async(req,res)=>{ 
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    const id=Number(req.params.id);
    const body=req.body;
    const userId=users.findIndex((user)=>user.id===id);
    if(userId==-1){
        return res.status(404).json({message:"user not found"});

    }
    users[userId]={...users[userId],...body,};
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            return res.status(500).json({message:"Error updating user"});

        }
        return res.json({
            status:"success",
            updateduser:users[userId],
        });
    });
})
.delete((req,res)=>{
    const id=Number(req.params.id);
    const userId=users.findIndex((user)=>user.id===id);
      if (userId === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(userId,1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting user" });
        }

        return res.json({
            status: "success",
            message: `User ${id} deleted`,
        });
    });
});

app.post("/api/users",async(req,res)=>{
   
    const body=req.body;
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
        return res.status(400).json({msg:"All fields are required"});
    }
    const result=await User.create({
        firstName:body.first_name,

        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,

    });
    console.log("result",result);
    return res.status(201).json({msg:"Success"});
  
    
});

app.get("/users",async(req,res)=>{
    const allDbUsers=await User.find({});
    const html=`
    <ul>
    ${allDbUsers.map(user=>`<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

const { json } = require("stream/consumers");
app.listen(PORT,()=>console.log("server started at"+PORT));
