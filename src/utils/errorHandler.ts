import {Request,Response,NextFunction} from 'express'

export interface CustomError extends Error{
    statusCode?:number
}

export const errorHandler = (fn:(req:Request,res:Response,next:NextFunction)=> Promise<any>) =>{
    return async (req:Request,res:Response,next:NextFunction) =>{
        try {
            await fn(req,res,next)
        } catch (error) {
            console.log(error);
            const customError = error as CustomError
            res.status(customError.statusCode || 500).json({
                massage: customError.message || 'server error'
            })
        }
    }
}