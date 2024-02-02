const fs=require('fs')
const path=require("path")
const asyncHandler= require("express-async-handler")
const { validateCreateAcivity, validateUpdateActivity, Activity } = require("../models/activityModel")
const {cloudinaryUploadImage, cloudinaryRemoveImage} =require("../utils/cloudinary")
const {Place}=require("../models/PlaceModel")

/**
 *@desc craete new activity
 *@route api/activities
 *@method POST
 *@access private (only admin)
 */

 module.exports.createActivityCntrl=asyncHandler(async(req,res)=>{
    //les etape de creation 
    //1.validation for the image 
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }
    //2.validation for data 
    const {error}=validateCreateAcivity(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    //3.upload photo 

    const imagePath=path.join(__dirname,`../images/${req.file.filename}`)
    const result=await cloudinaryUploadImage(imagePath);
    //4.create new endroit and save it to the db 
    //cette methode fait le sauvgarde automatique 
    const activity = await Activity.create({
        name:req.body.name,
      description:req.body.description,
       picture:{
           url:result.secure_url,
           publicId:result.public_id
      }
    });

    //5.send response to the client 
    res.status(201).json(activity)
    //6.remove mage from the server 
    fs.unlinkSync(imagePath)
 })

 /**
 *@desc get all activities
 *@route api/activities
 *@method Get
 *@access public
 */

 module.exports.getAllActivityCntrl=asyncHandler(async(req,res)=>{
    const activities = await Activity.find()
    if(activities){
        return res.status(201).json(activities)
    }else {
        return res.status(404).json({message:"NOT FOUND"})
    }
   
    
})


 /**
 *@desc get single activity
 *@route api/activities/:id
 *@method Get
 *@access public
 */

 module.exports.getSingleAcivityCntrl=asyncHandler(async(req,res)=>{
    const activity =await Activity.findById(req.params.id)
    if(!endroit){
        return res.status(400).json({message:"activity not found "})
    }
    res.status(200).json(activity)
 })
 


 /**
 *@desc get activty count 
 *@route api/activities/count 
 *@method Get
 *@access public
 */

 module.exports.getActivityCountCntrl=asyncHandler(async(req,res)=>{
    const count =await Activity.count();
    res.status(200).json(count)
 })

 /**
 *@desc delete actvity
 *@route api/activities/:id
 *@method delete 
 *@access only admin
 */

 module.exports.deleteActivityCntrl=asyncHandler(async(req,res)=>{
    const activity =await Activity.findById(req.params.id)
    
    if(!activity){
        return res.status(400).json({message:"activity not found "})
    }

    //authorization just for the admin
    if(req.admin.isAdmin){
        //supp de endroit from the db
        await Activity.findByIdAndDelete(req.params.id);
        //supp de endroit image from the cloudinary 
        await cloudinaryRemoveImage(activity?.picture.publicId);

        res.status(200).json({message:"activity has benn deleted ",activityId:activity.id})
    }else{
        res.status(403).json({message:"Acess dined "})
    }


 })


 /**
 *@desc update activity
 *@route api/activites/:id
 *@method PUt
 *@access private (only admin)
 */

 module.exports.UpdateActivityCntrl=asyncHandler(async(req,res)=>{
    //les etape 
    //1.validation 
    const {error}=validateUpdateActivity(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //2.get the endroit from db and check if exist 
    const activity = await Activity.findById(req.params.id);
    if(!activity){
        return res.status(400).json({message:` activity not found `})
    }

    //3. update endroit 
    const UpdatedActivity= await Activity.findByIdAndUpdate(req.params.id,{
       $set:{
         name:req.body.name,
         description:req.body.description,
        
       }
    }, {new : true})


    //4.send response to client 
    res.status(200).json(UpdatedActivity)
 })

 /**
 *@desc update activity picture
 *@route api/activities/update-image/:id
 *@method PUT
 *@access private (only admin)
 */

 module.exports.UpdateActivityImageCntrl=asyncHandler(async(req,res)=>{
    //les etape 
    //1.validation 
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }

    //2.get the endroit from db and check if exist 
    const activity = await Activity.findById(req.params.id);
    if(!activity){
        return res.status(400).json({message:`activity not found `})
    }
    //3. delete the old image
    if(activity.picture.publicId !== null){
     await cloudinaryRemoveImage(activity.picture?.publicId)
    }
    //4. upload new photo 
     const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
     const result= await cloudinaryUploadImage(imagePath);
     console.log(result);
     //5. update the image field in the  db 
     const UpdatedActivity = await Activity.findByIdAndUpdate(req.params.id,
        {
        $set:{
         picture:{
            url:result?.secure_url,
            publicId:result?.public_id,
         },
        },
     }, {new : true});

     //6. send response to the client 
     res.status(200).json(UpdatedActivity)
     //7. remove image from the server 
     fs.unlinkSync(imagePath)
 })




















 /**
 *@desc get single activity
 *@route api/activities/:id
 *@method Get
 *@access public
 */

 module.exports.getSingleAcivity=asyncHandler(async(req,res)=>{
    const activity =await Activity.findById(req.params.id)
    if(!activity){
        return res.status(400).json({message:"activity not found "})
    }
    res.status(200).json(activity)
 })

 /**
 *@desc get places by  activity 
 *@route api/activities/:id/places
 *@method Get
 *@access public
 */

 module.exports.getAcivityPlaces=asyncHandler(async(req,res)=>{
    const activity =await Activity.findById(req.params.id)
    if(!activity){
        return res.status(400).json({message:"activity not found "})
    }

    const places = await Place.find({activities:{_id:req.params.id}})
    if(!places){
        return res.status(400).json({message:"No Places..."})
    }
    if(places.length===0){
        return res.status(200).json(places)
    }
    
    res.status(200).json(places)
 })