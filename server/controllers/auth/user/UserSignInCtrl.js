const asyncHandler = require("express-async-handler")
const {User}= require("../../../models/UserModel")
const bcrypt = require("bcryptjs")
const {Account,validationSignin }= require("../../../models/AccountModel")

/**----------------------------------------------
*Descripition de file  
    @desc Sign in
*@router
    api/tunitour/signin
@methode 
    POST
@access 
    public 
  
*
-------------------------------------------------*/
 
module.exports.userSignInCtrl = asyncHandler(async(req,res)=>{
    //etape 1 : validation 
    //le fonction va faire une validation de donnees ali jeyin men req.body
    //le fonction va return un objet si la validation a des erreus 
    //400 : erreur cote client bad requiest : les donnes sont fausses


    const {error} = validationSignin(req.body)
    const email = req.body
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
   
    //etape 2 : l'existence d'utilisateur
    let account = await Account.findOne({
        email:req.body.email
    })
    if(!account){
        return res.status(404).json({message:"Invalid Email Or Password"})
    }


    //etape 3 : validation de mot de passse
    //avec bcrypt bibliotheque 
    const passwordCompare = await bcrypt.compare(req.body.password,account.password)
    if(!passwordCompare){
        return res.status(400).json({message:"Invalid Password"})
    }
    let user = await User.findOne({
        email:req.body.email
    })

    
    //etape 4 : Token
    const token = user.generateTokenAuth()


    
    //etape 5 : return to the client
    res.status(201).json({
        message:"Success Sign In , Enjoy",
        _id : account.idUser,
        token,
    })
})
