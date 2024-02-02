const {User}= require('../../../models/UserModel')
const {validationEmail}= require("../../../models/AccountModel")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer= require("nodemailer")
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
 
module.exports.userForgetPassword = asyncHandler(async(req,res)=>{
    //etape 1 : validation 
    //le fonction va faire une validation du email qui est arriver dans req.body
    //le fonction va return un objet si la validation a des erreus 
    //400 : erreur cote client bad requiest : les donnes sont fausses
    const {error} = validationEmail(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //etape 2 : verifier si user est existe ou non 
    let user = await User.findOne({
        email:req.body.email
    })
    if(!user){
        return res.status(400).json({message:"Invalid Email"})
    }

    //user exist , create a  new link valid for 15 min  
    const secret =process.env.PRIVATE_KEY + user.password

    const payload = {
        email:user.email,
        id : user.id
    }

    
    const token = jwt.sign(payload,secret,{expiresIn:"45m"})
   


    //const link =`http:localhost:3000/reset-password/${user.id}/${token}`
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"charrada.najeh@gmail.com",
                pass:"ykhmdzsyoyemnamy",
            },
        })  
        
        const mailOption = {
            from :"charrada.najeh@gmail.com", 
            to : user.email,
            subject:"TUNITOUR FORGET PASSWORD",
            html:`
            <div>
                <h1> Réinitialisation du mot de passe </h1>
            
                <p>reinitialiser votre  mot de passe en cliquant sur le lien suivant </p>
                <a href="http://localhost:3000/resetpassword/${user.id}/${token}">Cliquez ici</a>
      
            </div>`
        }

         transporter.sendMail(mailOption,function(error,info){
            if(!error){
                res.status(201).json({message:"Password Reset Link Has Been Sent To Your Email " })
            }
        })

    }catch(error){
        res.status(500).json({message:"Internal Server Error" })
    }
    

   

})