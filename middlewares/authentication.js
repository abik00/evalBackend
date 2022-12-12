const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.header?.authentication?.split(" ")[1]
    if(token){
        const decode=jwt.verify(token,'hash')
        if(decode){
            const userID=decode.userID
            req.body.userID=userID
            next()
        }
        else{
            res.send("please login")
        }
    }
    else{
        res.send("please login")
    }
}

module.exports={
    authenticate
}