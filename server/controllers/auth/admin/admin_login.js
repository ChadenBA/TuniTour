
//with this handler we don't need to write try and catch 
const asyncHandler=require("express-async-handler")
const bcrypt = require("bcryptjs");
const { validateLoginAdmin,Admin } = require("../../../models/adminModel");
const { VerficationToken } = require("../../../models/AdminverificationTokenModel");
const crypto=require("crypto")
/**
 *@desc admin login 
 *@route api/auth/adminLogin
 *@method POST
 *@access public
 */
//les étape de login:

 module.exports.admin_login= asyncHandler( async(req,res)=>{
      //1.validation (voir admin model)
    const {error} = validateLoginAdmin(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

    //check the email :
    let admin = await Admin.findOne({email:req.body.email})
    if(!admin){
        return res.status(400).json({message:"invalide email"})
    }

    //2.check the password 
    // mdp dans bd est crytter , on va comparer le mdp de base el le mdp saisie 
    const isPasswordMatch=await bcrypt.compare(req.body.password,admin.password)
    if(!isPasswordMatch){
        return res.status(400).json({message:"invalide password"})
        
    }
    console.log(req.body.password)

    //3 genrete toker (jwt)
    const token =admin.generateLoginToken();

    //creting new verficationtoken & save it to the db 
    const  verifictionToken = new VerficationToken({
       adminId: admin._id,
       token:crypto.randomBytes(32).toString('hex'),
    })

    await  verifictionToken.save();
    //5. resonse to client
    res.status(200).json({
        message:"your in ",
        _id: admin._id,
        profilepicture:admin.profilepicture,
        isAdmin:admin.isAdmin,
        adminname:admin.adminname,
        token ,  
        lastname:admin.lastname,
        age:admin.age,
        address:admin.address,
        phone:admin.phone,
        bio:admin.bio,
        email:admin.email,
    }) 
 })



 /**
 *@desc Verify Admin Account 
 *@route api/auth/:adminId/:token
 *@method GET
 *@access only admin 
 */

 module.exports.verifyAdminAccountCtrl=asyncHandler(async(req,res)=>{
    const admin = await Admin.findById(req.params.adminId);
    if(!admin){
        return res.status(400).json({message:"invalid link"})
    }

    const verficationtoken= await VerficationToken.findOne({
        adminId:admin._id,
        token:req.params.token,
    });

    if(!verficationtoken){
        return res.status(400).json({message:"invalid link"})
    }

    admin.isAccountVerified=true;
    await admin.save();

    await verficationtoken.remove();
    res.status(200).json({message:"your account verfied"});
 })
