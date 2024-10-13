import {Request,Response} from 'express'
import {genarateToken} from '../utils/authUtils'
import {createUser,getTeacherByClassname} from '../utils/userService'
import User from '../models/userModel'


export const register = async (req:Request,res:Response)=>{
    const {email,password,role,classname } = req.body
    // console.log(req.body);
    
        try {
            if(role === 'teacher'&& !await getTeacherByClassname(classname)){
                const user = await createUser({email,password,role,classname});
                console.log(user);
                  
                    res.status(201).json({
                        message:'manager is sinup',
                        userId: user._id
                    })
                }
            else if(role === 'teacher'){
                res.status(400).json({
                    message: `Class ${classname} already exists`
                })
            }
        
            else if(role === 'student' && await getTeacherByClassname(classname)){
                const user = await createUser({email,password,role,classname}); 
                res.status(201).json({
                    message:'user is sinup',
                    userId: user._id
                })
           }
           else if(role === 'student'){
            res.status(400).json({
                message: `Class ${classname} does not exist`
            })
        }
        } catch (error) {
            console.log(error);
            res.status(400).json('sinup field')
        }
}

export const login = async (req:Request,res:Response) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    console.log(user);
    

    if(!user || !(await user.comparePassword(password))){
        res.status(401).json({ message: 'username or password is not correct' })
        return
    }
    await user.save()
    
    const token = genarateToken(user.classname, user.role)
    res.cookie('token',token,{
        httpOnly:true,
        secure:false,
        maxAge:1000*60*60
    })
    res.status(201).json({
        message: "התחברת בהצלחה",
        userId: user._id,
        token })
    
}