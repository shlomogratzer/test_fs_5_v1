import mongoose,{Schema, Document} from "mongoose";
import bcrypt from 'bcryptjs'
 
export interface IUser extends Document {
    email:string,
    password : string,
    role: "teacher"| "student"
    classname : string,
    comparePassword(userPassword:string) : Promise<boolean>
}

const UserSchema = new Schema({
    email:{
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required : true,
    },
    role:{
        type:String,
        enum: ["teacher" , "student"],
        default:"student"
    },
    classname:{
        type:String,
        required : true,
    }


}, {timestamps : true})

UserSchema.pre<IUser>('save',async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.comparePassword = async function(userPassword:string) {
    return await bcrypt.compare(userPassword,this.password)
}
//מגדיר מאפיין ספציפי כאינדקס
UserSchema.index({classname:1})
UserSchema.index({email:1})

export default mongoose.model<IUser>('User',UserSchema)