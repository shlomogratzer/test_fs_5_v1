import {Request,Response} from 'express'
import * as scoreService from '../utils/scoreService'
import * as userService from '../utils/userService'
interface authRequest extends Request{
    user?: {classname:string}

}

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

export const getAllScoreByClassname = async (req:authRequest,res:Response) =>{
    const classname = req.user
    if(classname){
        const myscore = await scoreService.getAllScoreByClassname(classname.classname)
    

    res.json({
        myscore
    })
}
}
export const getAllScoreByStudentEmail = async (req:authRequest,res:Response) =>{
    const studentemail = req.body
    console.log(studentemail);
    
    if(!studentemail){ res.status(400).json({
        message: 'studentemail is empti'
        })
    }
    else{ 
        const myscore =  await scoreService.getAllScoreByStudentEmail(studentemail.studentemail)
        console.log(myscore);
        
        res.json({
            myscore
        })
    }
}