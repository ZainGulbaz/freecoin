import express from "express";
import blockchainRouter from "./Controllers/blockchain";
import "dotenv/config";
import zaynocoin from "./inititatechain";

const app= express();

//middlewares
app.use(blockchainRouter);


app.listen(parseInt(process.env.PORT!) || 3000,()=>{
   console.log("Server is running on port: "+process.env.PORT);
})