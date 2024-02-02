const fs=require('fs')
const path=require("path")
const asyncHandler= require("express-async-handler")
const { Agency, validateUpdateAgency, validateCreateAgency } = require("../models/agencyModel")
const {cloudinaryUploadImage, cloudinaryRemoveImage} =require("../utils/cloudinary")


/**
 *@desc craete new agency 
 *@route api/agencies
 *@method POST
 *@access private (only admin)
 */

 module.exports.createAgencyCntrl=asyncHandler(async(req,res)=>{
    //les etape de creation 
    //1.validation for the image 
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }
    //2.validation for data 
    const {error}=validateCreateAgency(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    //3.upload photo 

    const imagePath=path.join(__dirname,`../images/${req.file.filename}`)
    const result=await cloudinaryUploadImage(imagePath);
    //4.create new endroit and save it to the db 
    //cette methode fait le sauvgarde automatique 
   
    const agency = await Agency.create({
        name:req.body.name,
        url:req.body.url,
        picture:{
          url:result.secure_url,
          publicId:result.public_id
          
     },
     
    });
    console.log(agency)
    //5.send response to the client 
    res.status(201).json(agency);
    //6.remove mage from the server 
    fs.unlinkSync(imagePath)
 })

 /**
 *@desc get all agencies 
 *@route api/agencies
 *@method Get
 *@access public
 */

 module.exports.getAllAgenciesCntrl=asyncHandler(async(req,res)=>{
    const agences = await Agency.find()
    if(agences){
        return res.status(201).json(agences)
    }else {
        return res.status(404).json({message:"NOT FOUND"})
    }
 })



 /**
 *@desc get single agency
 *@route api/agencies/:id
 *@method Get
 *@access public
 */

 module.exports.getSingleAgencyCntrl=asyncHandler(async(req,res)=>{
    const agency =await Agency.findById(req.params.id)
    if(!agency){
        return res.status(400).json({message:"agency not found "})
    }


    res.status(200).json(agency)
 })
 



 /**
 *@desc delete agency
 *@route api/agencies/:id
 *@method delete 
 *@access only admin
 */

 module.exports.deleteAgencyCntrl=asyncHandler(async(req,res)=>{
    const agency=await Agency.findById(req.params.id)
    
    if(!agency){
        return res.status(400).json({message:"agency not found "})
    }

    //authorization just for the admin
    if(req.admin.isAdmin){
        //supp de endroit from the db
        await Agency.findByIdAndDelete(req.params.id);
        //supp de endroit image from the cloudinary 
        await cloudinaryRemoveImage(agency.picture.publicId);

        res.status(200).json({message:"agency has benn deleted ",agencyId:agency.id})
    }else{
        res.status(403).json({message:"Acess dined "})
    }


 })


 /**
 *@desc update agency
 *@route api/agencies/:id
 *@method PUt
 *@access private (only admin)
 */

 module.exports.UpdateAgenciesCntrl=asyncHandler(async(req,res)=>{
    //les etape 
    //1.validation 
    const {error}=validateUpdateAgency(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //2.get the endroit from db and check if exist 
    const agency= await Agency.findById(req.params.id);
    if(!agency){
        return res.status(400).json({message:`agency not found `})
    }

    //3. update agency 
    const UpdatedAgency = await Agency.findByIdAndUpdate(req.params.id,{
       $set:{
         name:req.body.name,
         url:req.body.url,
         }
    }, {new : true})


    //4.send response to client 
    res.status(200).json(UpdatedAgency)
 })

 /**
 *@desc update agency picture
 *@route api/agencies/update-image/:id
 *@method PUT
 *@access private (only admin)
 */

 module.exports.UpdateAgencyImageCntrl=asyncHandler(async(req,res)=>{
    //les etape 
    //1.validation 
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }

    //2.get the endroit from db and check if exist 
    const agency = await Agency.findById(req.params.id);
    if(!agency){
        return res.status(400).json({message:"agency not found "})
    }
    //3. delete the old image
    if(agency.picture.publicId !== null){
     await cloudinaryRemoveImage(agency.picture?.publicId)
    }
    //4. upload new photo 
     const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
     const result= await cloudinaryUploadImage(imagePath);
     console.log(result);
     //5. update the image field in the  db 
     const UpdatedAgency = await Agency.findByIdAndUpdate(req.params.id,
        {
        $set:{
         picture:{
            url:result?.secure_url,
            publicId:result?.public_id,
         },
        },
     }, {new : true})

     //6. send response to the client 
     res.status(200).json(UpdatedAgency)
     //7. remove image from the server 
     fs.unlinkSync(imagePath)
 })
