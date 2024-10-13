import Jwt from "jsonwebtoken";

export const genarateToken = (userId : string, role:string):string =>{
    return Jwt.sign({userId,role},process.env.TOKEN_SECRET as string, {expiresIn:'12h'})
}