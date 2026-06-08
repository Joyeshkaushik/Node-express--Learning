 const fs=require("fs");
 const os=require("os");
 //   const result=fs.readFileSync('./contacts.txt',"utf-8");  
// console.log(result); 
// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err)
// {
//     console.log("Error",err);
// }
// else console.log(result);
// });
// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
// fs.cpSync("./test.txt","./copy.txt");
// fs.unlinkSync("./copy.txt"); 
// fs.mkdirSync("my-docs/a/b",{recursive:true});
 fs.writeFileSync('./test.txt','hey there'); 
  fs.writeFile('./test.txt','hey ',(err)=>{});
  console.log(os.cpus().length);

