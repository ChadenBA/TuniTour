const {User }= require('../../../models/UserModel')
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Account } = require('../../../models/AccountModel')
/**----------------------------------------------
*Descripition de file  
    @desc Sign in
*@router
    api/tunitour/forgetpassword
@methode 
    POST"
@access 
    public 
  
*
-------------------------------------------------*/
 
module.exports.userResetPassword= asyncHandler(async(req,res)=>{



    //etape 1 : validation  si l'id arrive exsiste dans BD

    const {id,token}=req.params
    const {password}= req.body

    const  user = await User.findById(id)

    if(!user){
        return res.status("401").json({message:'Invalid ID... '})
    }
    const secret =process.env.PRIVATE_KEY + user.password
    try{

        const payload = jwt.verify(token,secret)

        bcrypt.compare(password, user.password).then(async(response)=>{
            if(response===false){
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(req.body.password,salt)
    
                const updateClient  = await User.findByIdAndUpdate(payload.id,{
                    $set : {
                        password:hashPassword, 
                    }
                },{new:true})
    
                const accountUpdate =await Account.findOneAndUpdate({email:payload.email},{
                    $set : {
                        password:hashPassword, 
                    }
                },{new:true})
                
                //return to client 
                res.status(200).json({updateClient,accountUpdate})
                
            }else{
                return  res.status("400").json({message:'The new password must be different from the old one... '})
            }
        }) 
               
     }catch(error){
        console.log(error.message)
     }
})