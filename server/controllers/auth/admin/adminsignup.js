//with this handler we don't need to write try and catch 
const asyncHandler=require("express-async-handler")
const bcrypt = require("bcryptjs");
const {Account} = require("../../../models/AccountModel")
const { Admin,validateSignupAdmin } = require("../../../models/adminModel");
/**
 *@desc admin login 
 *@route api/auth/adminLogin
 *@method POST
 *@access public
 */
//les étape de login:

 module.exports.admin_signup= asyncHandler( async(req,res)=>{
      //1.validation (voir admin model)
    const {error} = validateSignupAdmin(req.query);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    //check the email :
    // let admin = await Admin.find()
    // if(admin){
    //     return res.status(400).json({message:"Not Acceptable"})
    // }

    //etape 3 : hash password 
    //avec bcrypt bibliotheque 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.query.password,salt)

    //etape 4 : creation de nouvelle user
   const  admin = new Admin({
        adminname:req.query.adminname,
        email:req.query.email,
        password:hashPassword,
    })
    await admin.save()  

    //etape 5 : creation d'un nouveau compte 
    const account = new Account ({
        email:req.query.email,
        password:hashPassword,
        idUser:admin.id,
        isAdmin:true
    })
    await account.save()

    //5. resonse to client
    res.status(200).json({message:"Success Sign Up , You Can Log In Now "}) 
 })


