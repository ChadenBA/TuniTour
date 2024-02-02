const asyncHandler = require("express-async-handler")
const nodemailer= require("nodemailer")
const {validationEmail}= require("../../../models/AccountModel")
const {Code,validationCode}= require("../../../models/CodeModel")
const {User,validationChangePassword}= require('../../../models/UserModel')
const {Account }= require("../../../models/AccountModel")
const bcrypt = require("bcryptjs")


/**----------------------------------------------
*Descripition de file  
    @desc Security : send code 
*@router
    http://localhost:3002/api/tunitour/users/profile/${idUser}/security/valide-email
@methode 
    POST
@access 
    only user 
  
*
-------------------------------------------------*/
 
module.exports.sendCode = asyncHandler(async(req,res)=>{
    //etape 1 : validation 
    const {error} = validationEmail(req.body)
    if(error){
        return res.status(400).json({message:error.details[0]})
    }

    //etape 2 : verifier si user est existe ou non 
    let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({message:"Invalid Email"})
    }
    //etape 3 : email exist dans db 
    const userEmail = await User.findOne({email:req.body.email})

    if(userEmail){
        return res.status(400).json({message:"Email Is Already In Use"})

    }

    //generate code 
    var codeLength=6
    var codeG =""
    for (let i=0 ; i<codeLength ; i++){
        let randomNumber=Math.floor(Math.random()* process.env.CHARS.length)
        codeG += process.env.CHARS.substring(randomNumber,randomNumber+1)
    }

    const code_row  = await Code.findOne({idUser:{_id:req.params.id}})
    if(code_row){
        await code_row.updateOne({code:codeG,email:req.body.email})
    }else{
        await Code.create({
            code:codeG,
            idUser:req.params.id,
            email:req.body.email
        })
    }

    //creation d'un lien envoye a email 
    try{
        const Transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:"charrada.najeh@gmail.com",
                pass:"ykhmdzsyoyemnamy",
            },
        })  

        
        Transporter.sendMail({
            from :"charrada.najeh@gmail.com", 
            to : req.body.email,
            subject:"Validation code TUNITOUR",
            html:`
            <div>
                <h1> your Validation code </h1>
            
                <p> that's  code to validate your new email  : ${codeG}  </p>
            </div>`,
        }).catch((er)=>{
            console.log(er)
        })

    }catch(error){
        console.log(error)
        throw new Error("Internal Server Error ")
    }
    

    res.status(201).json({message:"Validation code Has Been Sent To Your Email " })

})

/**----------------------------------------------
*Descripition de file  
    @desc Security : valide code 
*@router
    http://localhost:3002/api/tunitour/users/profile/${idUser}/security/valide-email
@methode 
    POST
@access 
    only user 
  
*
-------------------------------------------------*/

module.exports.validetCode = asyncHandler(async(req,res)=>{
    //etape 1 : validation 
    const {error} = validationCode(req.body)
    if(error){
        return res.status(400).json({message:error.details[0]})
    }
    //etape 2 : check if code is similar to code that is already sent
    const code_row  = await Code.findOne({idUser:{_id:req.params.id}})

    if(!code_row){
        return res.status(404).json({message:"Undefined"})
    }
    if(code_row.code!==req.body.code){
        return res.status(404).json({message:"Invalid Code"})
    }

    //find user to update new email in user and account 

    await User.findOneAndUpdate({_id:req.params.id},{email:code_row.email})
    await Account.findOneAndUpdate({idUser:req.params.id},{email:code_row.email})

    res.status(200).json({message:"Updated Successfully"})

})

/**----------------------------------------------
*Descripition de file  
    @desc Security : change password
*@router
    http://localhost:3002/api/tunitour/users/profile/${idUser}/security/password
@methode 
    POST
@access  
    only user 
  
*
-------------------------------------------------*/


module.exports.changePassword = asyncHandler(async(req,res)=>{
    //etape 1 : validation 
    const {error} = validationChangePassword(req.body)
    if(error){
        return res.status(400).json({message:error.details[0]})
    }

    //etape 2 : verifier si user est existe ou non 
    let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({message:"Invalid Email"})
    }

    const compare = await bcrypt.compare(req.body.oldPass, user.password)
    if(compare===false){
        return  res.status("400").json({message:'The Old Password Incorrect '})
    }

    const compareNewWithOld = await bcrypt.compare(req.body.newPass, user.password)

    if(compareNewWithOld===true){
        return  res.status("400").json({message:'The new password must be different from the old onerd Incorrect '})
    }else if(req.body.newPass!==req.body.confirmPass){
        return  res.status("400").json({message:'Passwords Are Different '})
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.newPass,salt) 

        user.password=hashPassword
        await Account.findOneAndUpdate({idUser:req.params.id},{password:hashPassword})

        await user.save()
        res.status(200).json({message:"Updated Successfully"})
    }

    
})