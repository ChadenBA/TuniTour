const asyncHandler = require("express-async-handler")
const nodemailer= require("nodemailer")
const {validateEmail}= require("../../../models/adminModel")
const {Code,validationCode}= require("../../../models/CodeModel")
const {Account }= require("../../../models/AccountModel")
const bcrypt = require("bcryptjs")
const { Admin , validateNewPasswordupdate } = require("../../../models/adminModel")
const sendEmail=require("../../../utils/sendEmail");

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
  
    const {error} = validateEmail(req.body)
    if(error){
        return res.status(400).json({message:error.details[0]})
    }

    //etape 2 : verifier si user est existe ou non 
    let admin = await Admin.findById(req.params.id)
    if(!admin){
        return res.status(400).json({message:"Invalid Email"})
    }
   
    //etape 3 : email exist dans db 
    const adminEmail = await Admin.findOne({email:req.body.email})

    if(adminEmail){
        return res.status(400).json({message:"email exist "})

    }
    //generate code 
    var codeLength=6
    var codeG =""
    for (let i=0 ; i<codeLength ; i++){
        let randomNumber=Math.floor(Math.random()* process.env.CHARS.length)
        codeG += process.env.CHARS.substring(randomNumber,randomNumber+1)
    }

    const code_row  = await Code.findOne({email:req.body.email})
    var result 
    if(code_row){
        await code_row.updateOne({code:codeG,email:req.body.email})
    }else{
       result = await Code.create({
            code:codeG,
            idUser:admin.id,
            email:req.body.email
        })
    }
    
//console.log(adminEmail.id)
   //5.creating hrml template
   
   const htmlTemplate=`
   <div>
       <h1> your Validation code </h1>
   
       <p> that's  code to validate your new email  : ${codeG}  </p>
   </div>`
   //6. Sending Email
  
   await sendEmail(req.body.email,"Resset Password", htmlTemplate);
   
    
   //res.status(200).json(result)

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
    console.log("this is code row",code_row)
    if(!code_row){
        return res.status(404).json({message:"Undefined"})
    }


    await Admin.findByIdAndUpdate(req.params.id,{email:code_row.email})
    const x=  await Account.findOneAndUpdate({idUser:req.params.id},{email:code_row.email})

    await Code.findByIdAndDelete(code_row.id)
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
    const {error} = validateNewPasswordupdate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0]})
    }
    //etape 2 : verifier si user est existe ou non 
    var admin = await Admin.findById(req.params.id);
   
    if(!admin){
        return res.status(400).json({message:"Invalid Email"})
    }

    const compare = await bcrypt.compare(req.body.oldPass, admin.password)
    if(compare===false){
        return  res.status("400").json({message:'The Old Password Incorrect '})
    }

    const compareNewWithOld = await bcrypt.compare(req.body.newPass, admin.password)

    if(compareNewWithOld===true){
        return  res.status("400").json({message:'The new password must be different from the old onerd Incorrect '})
    }else if(req.body.newPass!==req.body.confirmPass){
        return  res.status("400").json({message:'Passwords Are Different '})
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.newPass,salt) 
        
        admin.password=hashPassword
     
        const newpass= await Account.findOneAndUpdate({idUser:req.params.id},{password:hashPassword})
        await admin.save()
        res.status(200).json({message:"Updated Successfully"})
    }

    
})