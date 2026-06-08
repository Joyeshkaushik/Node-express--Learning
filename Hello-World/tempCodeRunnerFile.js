fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    if(err)
{
    console.log("Error",err);
}
else console.log(result);
});