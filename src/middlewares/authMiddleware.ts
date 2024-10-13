import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface authRequest extends Request{
    user?:{classname: string, role:string}
}
export const authMiddleware = (req:authRequest,res:Response,next:NextFunction): void =>{
    const token = req.cookies.token
    if(!token){
        res.status(401).json({messege: 'token is not correct'})
        return
    }
    console.log("token", token);
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as {classname:string,role:string}
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({messege: 'token is not valid'})
        console.log(error);
        
    }
}
export const isManager = (req:authRequest,res:Response,next:NextFunction): void =>{
    if(req.user?.role !== 'teacher'){
        res.status(403).json({message:'Access denied'})
        
    }else if(req.user?.role === 'teacher'){
        next()
    }
}
export const isNotManager = (req:authRequest,res:Response,next:NextFunction): void =>{
    if(req.user?.role !== 'student'){
        res.status(403).json({message:'Access denied'})
        
    }else if(req.user?.role === 'student'){
        next()
    }
}