import express from "express";
import dotenv from "dotenv";
dotenv.config()
const app = express();
const port = process.env.PORT
app.get("/", (req, res)=>{
    res.json({
        msg: 'Welcome to HMS'
    })
})

app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`)
})