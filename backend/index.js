import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import { connectDb, patient } from "./db.js"
import { userValidation, patientValidation, signinValidation } from "./validation.js";
import bcrypt from "bcrypt";
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
app.use(cookieParser());

app.post("/signup", async (req,res)=>{
    const result = userValidation.safeParse(req.body)
    if(!result)
        return res.json({
        msg: "Invalid Credentials",
        error: result.error.issues
    })
    const { name, emailId, password, role} = result.data;
    
    if(!name || !emailId || !password || !role){
        return res.json({
            msg: "Enter all credentials"
        })
    }
    
    const userExist = await UserModel.findOne({emailId})
        if(userExist){
                return res.json({
                msg: "User already exist, Enter unique Id"
            })
        }
    
    const hashpassword = await bcrypt.hash(password, 10)

    const createUser = await UserModel.create({

        name, 
        emailId, 
        password: hashpassword,
        role
    })
        return res.json({
        msg: "User added successfully",
        createUser,
        hashpassword
    })
})

// JWT
app.post('/signin', async (req, res)=>{
    const result = signinValidation.safeParse(req.body)
    if(!result){
        return res.json({
            msg: result.error.issue
        })
    }

    const { emailId, password } = result.data;
    if( !emailId || !password ){
        return res.json({
            msg: "Enter all credentials"
        })
    }

    const userExist = await UserModel.findOne({emailId})
    if(!userExist){
        return res.status(401).json({
            msg: "User does not exist. Please signup"
        })
    }

    const matchPass = await bcrypt.compare(password, userExist.password)
    if(!password){
        return res.status(400).json({
            msg: "Wrong Password. Enter correct Password"
        })
    }

    const token = jwt.sign(
        
        {
        userId: userExist._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1m"
        } 
    )

    res.cookie("token", token , {
        httpOnly: true, // browser's javascript code should not read this cookie
        secure: true,  
        sameSite: "lax", // lax is used to handle CSRF(Cross site request Forgery)
        maxAge: 60*60*1000 // ! hour
    })

    res.json({
        msg: "Login Successful",
        token
    })
})

app.post("/patient", async(req,res)=>{
    const result = patientValidation.safeParse(req.body)
    if(!result)
        return res.json({
            msg: "Invalid credentials",
            error: result.error.issues
    })
    const { name, gender, age, bloodGroup, address } = result.data

    const patientcreate = await patient.create({
        name , gender, age, bloodGroup, address
    })
    
    return res.json({
        msg: "Patient records created successfully",
        patientcreate
    })
})

app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`)
})
// http:localhost:3000/signup