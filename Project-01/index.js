const express=require("express");
const app=express();
const fs=require("fs");
const PORT=8000;

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

app.get("/api/users",(req,res)=>{
    res.setHeader("X-myName","Joyesh Kaushik");//header
    console.log(req.headers);
    return res.json(users);
});
app.route("/api/users/:id")

.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
}).patch((req,res)=>{ 
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

app.post("/api/users",(req,res)=>{
   
    const body=req.body;
    console.log("body:", req.body);
console.log("query:", req.query);
    users.push({ ...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length});

    });
    
});

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
const users=require("./MOCK_DATA.json");
const { json } = require("stream/consumers");
app.listen(PORT,()=>console.log("server started at"+PORT));
