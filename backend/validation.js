import zod from "zod" //Joi and Zod are used for type checking/safety of input.
export const userValidation = zod.object({
    name: zod.string().min(3, "minimum 3 characters required"),
    emailId: zod.string().email(),
    password: zod.string().min(6, "minimun 6 characters required").max(10, "maximun 10 characters possible"),
    role: zod.enum(["doctor" , "patients" , "staffs"])
})

export const patientValidation = zod.object({
    name: zod.string().min(3),
    gender: zod.enum(["male" , "female" , "others"]),
    age: zod.number(),
    bloodGroup: zod.string(),
    address: zod.string()
})

export const signinValidation = zod.object({
    emailId: zod.string().email(),
    password: zod.string.min(6,"minimum 6 characters required")
})