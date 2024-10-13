import User ,{IUser} from "../models/userModel"

export const createUser = async(UserData:Partial<IUser>):Promise<IUser> => {
    const user = new User(UserData)
    return await user.save()
    
}
export const getTeacherByClassname = async(classname:string):Promise<IUser| null> =>{
    return await User.findOne({classname})
}


