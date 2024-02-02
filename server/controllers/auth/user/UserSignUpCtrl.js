const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const {User,validationSignup }= require("../../../models/UserModel")
const {Account} = require("../../../models/AccountModel")
const {Admin} =require("../../../models/adminModel")


/**----------------------------------------------
*Descripition de file  
    @desc Sign up 
*@router
    api/tunitour/signup
@methode 
    POST
@access 
    public 
*
-------------------------------------------------*/
 
module.exports.userSignUpCtrl = asyncHandler(async(req,res)=>{
    //etape 1 : validation
    //le fonction va faire une validation de donnees arrivee de view
    //le fonction va return un objet si la validation a des erreus 
    //400 : erreur cote client bad requiest : les donnes sont fauss

    const {error} = validationSignup(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //etape 2 : verification si user est existe dans db 
    let user = await User.findOne({
        email:req.body.email
    })
    if(user){
        return res.status(400).json({message:"User Already Exist"})
    }
    let admin = await Admin.findOne({
        email:req.body.email
    })
    if(admin){
        return res.status(400).json({message:"unable to create an account with this email"})
    }

    //etape 3 : hash password 
    //avec bcrypt bibliotheque 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    //etape 4 : creation de nouvelle user
    user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName, 
        age:req.body.age,
        email:req.body.email,
        nationality:req.body.nationality,
        password:hashPassword,
        phone:req.body.phone,
        adress:req.body.adress,
        bio:req.body.bio
    })
    await user.save()   

     //etape 5 : creation d'un nouveau compte 
     const account = new Account ({
        email:req.body.email,
        password:hashPassword,
        idUser:user.id,
        isAdmin:false
     })
     await account.save()

    //return to the client
    res.status(201).json({message:"Success Sign Up , You Can Log In Now "})
})