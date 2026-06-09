const http=require("http");
// const fs=require("fs");
// const url=require("url");
const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    return res.send("Hello from home page");
}); 
app.get("/about",(req,res)=>{
        return res.send("Hello from  About page"+"hey"+req.query.name);
})
function myHandler(req,res){
 // console.log(req.headers);
    if(req.url=="/favicon.ico") return res.end();
    const log=`${Date.now()}:${req.method} ${req.url} New Request Recieved\n`;
    const myurl=url.parse(req.url,true);
    console.log(myurl);
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myurl.pathname){
            case "/":
                if(req.method==='GET')res.end("Homepage");
             break;
            case "/about":
                const username=myurl.query.myname;
                res.end(`hi, ${username} `);

            break;
            case "/search":
                const search=myurl.query.search;
                res.end(`Here are your results for ${search}`); 
                break;
            case "/signup":
                if(req.method==="GET" )res.end("this is a signup form");
                else if(req.method==="POST"){
                    res.end("Success");
                } 
                else res.end("Nothing happens");   
                break;
             default:
                res.end("joyesh");
        }
       
    });
}
app.listen(8000,()=>console.log("Server Started"));
//  const myServer=http.createServer(app);
//  myServer.listen(8000,()=>console.log("Server Started"));