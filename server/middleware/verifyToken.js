 const  jwt = require("jsonwebtoken");
 //verify token 
//middleware
function verifyToken(req,res,next){
    const authToken = req.headers.authorization;
    if(authToken){
         const token = authToken.split(" ")[1];
         try{
            const decodedPlaylaod = jwt.verify(token,process.env.PRIVATE_KEY);
            req.admin=decodedPlaylaod;
            req.user=decodedPlaylaod; 
            next();
          }catch(error){
            return res.status(401).json({message:"invalidToken"})
         }
    }else{
        return res.status(401).json({message:"no token provided"})
    }
}
//midleware verify token and admin 
function verifyTokenAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.admin.isAdmin){
            next()
        }else{
            return res.status(403).json({message:"only admin"})
        }
    })
}

//midleware verify token and only admin himself 
function verifyTokenAndOnlyAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.admin.id=== req.params.id){
            next()
        }else{
            return res.status(403).json({message:"only admin himself"})
        }
    })
}

//Verify User TokverifyTokenen
function verifyTokenOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id){
            next();
        }else {
            return res.status(403).json({message:"Not allowed"})

        }
    })
  
}

module.exports={
    verifyToken,verifyTokenAdmin,verifyTokenAndOnlyAdmin,verifyTokenOnlyUser
}  