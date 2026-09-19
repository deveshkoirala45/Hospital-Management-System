import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    emailId: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["doctor", "patients", "staffs"], default: "patient"},
},{
    timestamps: true
})

export const UserModel = mongoose.Model("User", userSchema);

const docSchema = new mongoose.Schema({
    name: {type: String, required: true},
    specialization: {type: String, required: true},
    emailId: {type: String, required: true},
    phNo: {type: String, required: true},
    fees: {type: Number, required: true},
    availability: {type: Arr[Strings], required: true, default: []},
},{
    timestamps: true
})

export const docModel = mongoose.Model("doc", docSchema);

const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, enum: ["male", "female", "others"], required: true},
    age: {type: Number, required: true},
    bloodGroup: {type: String, required: true},
    address: {type: String}
},{
    timestamps: true
})

export const patient = mongoose.Model("patient", patientSchema);
