import mongoose,{Schema, Document} from "mongoose";
 
export interface IScore extends Document {
    studentemail: string,
    classname : string,
    score: number
}

const ScoreSchema = new Schema({
    studentemail:{
        type:String,
        required : true,
        unique:true
    },
    classname:{
        type:String,
        required : true
    },
    score:{
        type: Number,
        required : true
    }


}, {timestamps : true})


//מגדיר מאפיין ספציפי כאינדקס
ScoreSchema.index({classname:1})
ScoreSchema.index({email:1})
ScoreSchema.index({score:1})

export default mongoose.model<IScore>('Score',ScoreSchema)