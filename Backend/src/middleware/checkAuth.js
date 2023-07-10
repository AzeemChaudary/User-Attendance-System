import jwt from 'jsonwebtoken';
const JWT_SECRET="SECRET";

const checkAuth=async(req,res,next)=>{
    
    const token = req.headers.authorization;
    console.log("token is " + token)
   
if(!token){
    
    console.log("token not found")
    return  res.status(401).send({message: 'Unauthorized Token Not Found' });
}
const decode= await jwt.verify(token,JWT_SECRET)
if(!decode){  
    res.json("token is invalid")
}
console.log("decode " + decode)
req.user=decode;
next();
}

export default checkAuth;