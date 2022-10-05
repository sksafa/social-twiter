import userModel from "../models/userModel"
import { hashPassword, comparePassword } from "../utiles/helper"
import jwt from 'jsonwebtoken'

export const  registerController = async   (req, res)=>{
        const {name,email, password,answer} = req.body
        if(!name){
            return res.status(400).send("Name is required")
        }
        if(!password){
            return res.status(400).send("password is required")
        }
        if(!answer){
            return res.status(400).send("Answer is required")
        }
        
        const exist = await userModel.findOne({email})
        if(exist){
            return res.status(400).send("Email Already Taken")
        }

        //hash password
        const hashedPassword = await hashPassword(password)
        const user = new userModel({name,email,password:hashedPassword, answer})
        try{
            await user.save()
            res.status(200).send('User Registered Successfully')
        }catch(error){
            console.log("error while registration", error)
            return res.status(400).send('Error , Try again')
        }
}

export const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user) return res.status(400).send('User Invalid')
        const match = await comparePassword(password, user.password)
        if(!match) return res.status(400).send('Password Invalid')
        //token
        const token =jwt.sign({_id:user._id}, process.env.JWT_SERECT,{
            expiresIn:'1d'
        })
        user.password = undefined
        user.answer= undefined
        res.status(200).json({
            token,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }
}