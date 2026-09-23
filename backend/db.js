import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectDb() { // Backend communications are asynchronous because it returns a promise which needs to be resolved.
    // Promise gives pending, resolved, error.
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("connected")
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    emailId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["doctor", "patients", "staffs"], default: "patients"},
},{
    timestamps: true
})

export const UserModel = mongoose.model("User", userSchema);

const docSchema = new mongoose.Schema({
    name: {type: String, required: true},
    specialization: {type: String, required: true},
    emailId: {type: String, required: true, unique: true},
    phNo: {type: String, required: true},
    fees: {type: Number, required: true},
    availability: {type: [String], required: true, default: []},
},{
    timestamps: true
})

export const docModel = mongoose.model("doc", docSchema);

const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, enum: ["male", "female", "others"], required: true},
    age: {type: Number, required: true},
    bloodGroup: {type: String, required: true},
    address: {type: String}
},{
    timestamps: true
})

export const patient = mongoose.model("patient", patientSchema);