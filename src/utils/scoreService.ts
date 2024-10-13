import Score ,{IScore} from "../models/scoreModel"

export const createScore = async(ScoreData:Partial<IScore>):Promise<IScore> => {
    const user = new Score(ScoreData)
    return await user.save()
    
}

export const getTeacherByClassname = async(classname:string):Promise<IScore| null> =>{
    return await Score.findOne({classname})
}
export const getAllScoreByClassname = async(classname:string):Promise<IScore[]> =>{
    return await Score.find({classname})
}
export const getAllScoreByStudentEmail = async(studentemail:string):Promise<IScore[]> =>{
    return await Score.find({studentemail})
}