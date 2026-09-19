import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db.js"
dotenv.config()
connectDb();
import { UserModel } from "./db.js"
const app = express();
const port = process.env.PORT
app.get("/", (req, res)=>{
    res.status(200).json({
        msg: 'Welcome to HMS'
    })
})
app.use(express.json());

app.post("/signup", async(req, res)=> {
    const name = req.body.name;
    const emailId= req.body.emailId;
    const password = req.body.password;
    const role = req.body.role;

    if(!name || !emailId || !password || !role ) {
        return res.status(400).json({
            msg: "Enter every credentials"
        })
    }
    const userExist = await UserModel.findOne({ emailId })
    if(userExist){
        return res.status(409).json({
            msg: "User already exist use new email"
        })
    }
    const user = await UserModel.create({
        name, emailId, password, role
    })
    res.json({
        msg: "signup completed",
        data: {
            user
        }
    })



})

app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`)
})
// http:localhost:3000/signup