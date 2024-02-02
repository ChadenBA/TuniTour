const asyncHandler= require("express-async-handler")
const {Admin, validateUpdateAdmin} = require("../models/adminModel")
const bcrypt = require("bcryptjs")
const fs=require('fs')
const path=require("path")
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require("../utils/cloudinary")
/**
 *@desc get admin 
 *@route api/auth/adminLogin
 *@method Get
 *@access private (only admin)
 */
module.exports.getAdminCntrl=asyncHandler(async(req,res)=>{
    //return the token in the terminal 
    //headers and authorisation from the postman 
    //split convert from string to array in js 
    //console.log(req.headers.authorization.split(" ")[1]);
   
    //acees just for the admin 
    //403 : forbiden
//    if(!req.admin.isAdmin){
//     return res.status(403).json({message:"only admin"})
//    }
   
    const admin = await Admin.find().select("-password");
    res.status(200).json(admin)
});


/**
 *@desc get admin profile
 *@route api/admin/adminProfile/:id
 *@method Get
 *@access private (only admin)
 */
 module.exports.getAdminProfileCntrl=asyncHandler(async(req,res)=>{
   
    const admin = await Admin.findById(req.params.id).select("-password");
    res.status(200).json(admin)

});

/**
 *@desc update admin profile
 *@route api/admin/profile/:id
 *@method put
 *@access private (only admin)
 */
// update user steps 

 module.exports.updateAdminProfileCtrl=asyncHandler(async(req,res)=>{
   //1) la validation 
    const{error} =validateUpdateAdmin(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //2)check if the admin wanna change the pwd or not 
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt)
    }
    //3)update the admin avec ll id 
    const updateAdmin = await Admin.findByIdAndUpdate(req.params.id,{
        // el set ymshy ll bd w y3ml update ll this 
        $set:{
            adminname:req.body.adminname,
            lastname:req.body.lastname,
            password:req.body.password,
            bio:req.body.bio,
            address:req.body.address,
            phone :req.body.phone,
            age:req.body.age,
            email:req.body.email,}
        
    },
    //return the new object except el pwd 
    {new : true }).select("-password");
    //4)response 
    res.status(200).json(updateAdmin)
 })
 
/**
 *@desc upload profile picture
 *@route api/admin/profile/profile-pic-upload
 *@method POST
 *@access private (only admin)
 */
module.exports.getProfilePicUploadCntrl=asyncHandler(async(req,res)=>{

    //les etape 
    //1.validation if the admin didin't give a file
    if(!req.file){
        return res.status(400).json({message:"no file provided"})
    }
    //2.get the path to the image
    const imagePath=path.join(__dirname,`../images/${req.file.filename}`)
     
    //3.upload to cloudinary
      const result=await  cloudinaryUploadImage(imagePath);
      console.log(result);
    //4.get the admin from the db
       const admin= await Admin.findById(req.admin.id)

    //5.delete the old profile photo if exist 
    if(admin.profilepicture.publicId !== null){
        await cloudinaryRemoveImage(admin.profilepicture?.publicId)
    }
    //6.change the profilePhoto field in the db 
      admin.profilepicture={
        url:result.secure_url,
        publicId: result.public_id
     }
    await admin.save();
    
    console.log (req.file);
    //7.send response to client and affichage de l'image 
    res.status(200).json({message:"your profile photo aploaded successuly",
     profilepicture:{
       url:result.secure_url,publicId:result.public_id
     }
})
    //8.remove image from the server (dans images folder )
     fs.unlinkSync(imagePath);

})
