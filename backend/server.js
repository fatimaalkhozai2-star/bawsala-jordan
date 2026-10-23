const express=require("express");
const app=express();
app.use(express.json());
const PORT = 5000;
const connectDB=require("./config/db");

app.get("/",(req,res)=>{

res.send("welcome to Bawsala Jordan")
});

const startServer=async()=>{
await connectDB();
app.listen(PORT,()=>{
console.log(`Bawsala Jordan server is running on port ${PORT}`);
});
};
startServer();