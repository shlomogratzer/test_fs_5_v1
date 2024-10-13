import Jwt from "jsonwebtoken";

export const genarateToken = (classname : string, role:string):string =>{
    return Jwt.sign({classname,role},process.env.TOKEN_SECRET as string, {expiresIn:'12h'})
}