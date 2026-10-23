const express=require("express");
const app=express();
const PORT=5000;


app.get("/",(req,res)=>{

res.send("welcome to Bawsala Jordan")
});

app.listen(PORT,()=>{
console.log(`Bawsala Jordan server is running on port${PORT}`);
});