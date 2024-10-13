import {Request,Response} from 'express'
import * as scoreService from '../utils/scoreService'
import * as userService from '../utils/userService'

export const createScore = async (req:Request,res:Response)=>{
    const {studentemail,classname ,score} = req.body
    
        try {
            if(!studentemail || !classname || !score){
                res.status(400).json({
                    message: 'studentemail or classname or score is reqaerd'
                })
            }
            else if(await userService.getUserClassnameByEmail(studentemail)){
                const newScore = await scoreService.createScore({studentemail,classname,score});
                console.log(newScore);

                res.status(201).json({
                    message:'score is save',
                    userId: score._id
                })
            }
                
            
        } catch (error) {
            console.log(error);
            res.status(400).json('rite score field')
        }
    
}