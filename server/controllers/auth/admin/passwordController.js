const asyncHandler=require("express-async-handler")
const bcrypt = require("bcryptjs");
const { validateEmail,Admin,validateNewPassword } = require("../../../models/adminModel");
const sendEmail=require("../../../utils/sendEmail");
const crypto=require("crypto");
const{VerficationToken} =require("../../../models/AdminverificationTokenModel");
const { invalid } = require("joi");

/**
 *@desc send resset paasword link 
 *@route api/password/reset-password-link
 *@method POST
 *@access only admin 
 */

 module.exports.sendRessetPwdlinkCntrl=asyncHandler(async(req,res)=>{
    //les etape 

    //1.validation 
     const {error}=validateEmail(req.body)
     if(error){
        return res.status(400).json({message:error.details[0].message})
     }

    //2.get the admin from db by email

    const admin = await Admin.findOne({email:req.body.email});
    //3.creating verficationtoken

    let verificationToken = await VerficationToken.findOne({adminId:admin._id})

    if(!verificationToken){
        verificationToken=new VerficationToken({
            adminId:admin._id,
            token:crypto.randomBytes(32).toString('hex'),
        });
        await verificationToken.save();
    }
   
    //4.creating link

    const link = `${process.env.CLIENT_DOMAINE}/admin/resetpwd/${admin._id}/${verificationToken.token}`
    //5.creating hrml template
   
     const htmlTemplate=`<a href="${link}">click here to reset your password</a>`
    //6. Sending Email
   
    await sendEmail(req.body.email,"Resset Password", htmlTemplate);
   
    //7.Response to the client 
    res.status(200).json({
        message:"Password reset link sent to your email, please check your email"
    })
 })


 /**
 *@desc Get resset paasword link 
 *@route api/password/reset-password-link/:adminId/:token
 *@method Get
 *@access only admin 
 */
module.exports.getRessetPwdLinkCntrl=asyncHandler(async(req,res)=>{

    const admin = await Admin.findById(req.params.adminId);
   

    if(!admin){
        return res.status(400).json({message:"invalid link "})
    }

    const verificationToken= await VerficationToken.findOne({
       adminId: admin._id,
        token:req.params.token,
        
    })
    
    if(!verificationToken){
        return res.status(400).json({message:"invalid link"})
    }
    
    res.status(200).json({
        message:"Valid url"
    })    
    
   
})



/**
 *@desc resset paasword 
 *@route api/password/reset-password-link/:adminId/:token
 *@method POST
 *@access only admin 
 */
 module.exports.ressetPwdCntrl=asyncHandler(async(req,res)=>{

   //les etapes 
   //check the password 

      //1.validation  new pwd 
      const {error}=validateNewPassword(req.body)
      if(error){
         return res.status(400).json({message:error.details[0].message})
      }
   
     //2.get the admin from db by email
 
     const admin = await Admin.findById(req.params.adminId);
     if(!admin){
        return res.status(400).json({message:"invalid link"})

    }
    //3.check the token
    const verificationtoken=await VerficationToken.findOne({
        adminId: admin._id,
        token:req.params.token,

    })
    if(!verificationtoken){
        return res.status(400).json({message:"invalid link"})

    }
    
     //5.hash the pwd 
    const salt = await bcrypt.genSalt(10);
    
     const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //6.save new pwd in DB
    admin.password=hashedPassword;
   // console(admin.password)
    await admin.save();
    //7.remove the verification token 
    await verificationtoken.remove();
    //8.send response to the client 

    res.status(200).json({ message: "Password reset successfully, please log in" });


 })


