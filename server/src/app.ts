import express, { json,urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import todoRouter from "./routes/todo"

dotenv.config({
    path:'./.env'
})
const app = express()

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(json())
app.use(urlencoded({extended:true}))

app.use("/api",todoRouter)


mongoose.connect(process.env.MONGODB_URL as string).then(()=>{
    console.log("connect to mongodb");
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
        
    })
}).catch((err)=>{
    console.log(err);
    process.exit(1)
}
)
