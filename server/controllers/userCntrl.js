const asyncHandler = require("express-async-handler")
const {User,validationUpdateData}= require("../models/UserModel")
const path= require("path")
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require("../utils/cloudinary")
const fs=require("fs");
const {Place}=require('../models/PlaceModel');
const {Comment}=require('../models/commentModel');
const {rateActivity} = require("../models/RateActivityModel")
const {Rate}=require('../models/RatePlaceModel');
const {Account}=require('../models/AccountModel');
const {Code}=require('../models/CodeModel');

/**----------------------------------------------
*Descripition de file  
@desc profile management : Get Profile

*@router
    api/tunitour/users/profile/:id
@methodes 
    Get
@access 
    public 
  
*
-------------------------------------------------*/


const getProfileClient = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password")
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(404).json({message:"User Not Found"})
    }
    
})



const  getAllProfileUsers = asyncHandler(async(req,res)=>{
    const users = await User.find()
    if(users){
        return res.status(200).json(users)
    }else{
        return res.status(404).json({message:"User Not Found"})
    }
})




/**----------------------------------------------
*Descripition de file  
@desc profile management :  Update Profile

*@router
    api/tunitour/users/profile/:id
@methodes 
    UPDATE
@access 
    priavte : only user 
  
*
-------------------------------------------------*/


const  updateProfileUser = asyncHandler(async(req,res)=>{
    


    //etape 1 :Data Validation
    const {error} = validationUpdateData(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //etape : modifier les donnees 
    const updateClient  = await User.findById(req.params.id)
    if(req.body.firstName!==""){
        await updateClient.updateOne({firstName:req.body.firstName},{new:true})
    }
    if(req.body.lastName!==""){
        await updateClient.updateOne({lastName:req.body.lastName},{new:true})
    }
    if(req.body.age!==null){
        await updateClient.updateOne({age:req.body.age},{new:true})
    }
    if(req.body.adress!==""){
        await updateClient.updateOne({adress:req.body.adress},{new:true})
    }
    if(req.body.nationality!==""){
        await updateClient.updateOne({nationality:req.body.nationality},{new:true})
    }
    if(req.body.phone!==""){
        await updateClient.updateOne({phone:req.body.phone},{new:true})
    }
    if(req.body.bio!==""){
        await updateClient.updateOne({bio:req.body.bio},{new:true})
    }
    const clientUpdated  = await User.findById(req.params.id)

    res.status(200).json(clientUpdated)
    })





/**----------------------------------------------
*Descripition de file  
@desc profile management :  Update Profile Photo
*@router
    api/tunitour/users/profile/:id
@methodes 
    UPDATE
@access 
    priavte : only user 
  
*
-------------------------------------------------*/




const  updateProfileUserPhoto = asyncHandler(async(req,res)=>{
    //etape 1 : validation
    if(!req.file){
        return res.status(400).json({message:"No File Provided"})
    }

    //etape 2 : get the path to the image
    const pathImage = path.join(__dirname,`../images/${req.file.filename}`)

    //etape 3 : upload to cloudinary
    const result = await cloudinaryUploadImage(pathImage)
    console.log(result.public_id)
    //etape 4 : get the user from DB
    const user = await User.findById(req.user.id)

    console.log(user)
    //etape 5 : delete the old profile photo if exist
    if(user.photoProfile.publicId!==null){
        await cloudinaryRemoveImage(user.photoProfile.publicId)
    }

    //etape 6 : change the photo profile field in the DB
    user.photoProfile={
        url:result.secure_url,
        publicId:result.public_id,
    }

    await user.save();

     // etape 7 : send response to client  with  new profile photo
      res.status(200).json({
        message:"Your Profile Photo Uploaded successfully",
        profilePhoto :{
            url:result.secure_url, 
            publicId:result.public_id
        }
    })
    //etape 8 : delete image from server
     fs.unlinkSync(pathImage)


   

})
const  deleteProfileUserPhoto = asyncHandler(async(req,res)=>{

    //etape 1 : get the user from DB
    const user = await User.findById(req.user.id)

    //etape 2 : change the photo profile field in the DB
    user.photoProfile={
        url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
        publicId:null,
    }

    await user.save();

     // etape 3 : send response to client  with  new profile photo
      res.status(200).json({
        message:"Your Profile deleted successfully",
        profilePhoto :{
            url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png", 
            publicId:null
        }
    })

})

/**----------------------------------------------
*Descripition de file  
@desc List management : bucket List
*@router
    api/tunitour/users/profile/bucket-list
@methodes 
    GET - POST - DELETE 
@access 
    priavte : only user 
  
*
-------------------------------------------------*/

const  getBucketList = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        return res.status(200).json(user.bucketList)
    }else{
        return res.status(404).json({message:"User Not Found"})
    }
})


const  addToBucketList = asyncHandler(async(req,res)=>{
    const place= await Place.findById(req.body.id)
    if(!place){
        return res.status(404).json({message:"not found"})
    }

    const user = await User.findByIdAndUpdate(req.params.id,
        {$addToSet:{"bucketList":place}})
    return res.status(200).json(user)
})



const  deleteFromBucketList = asyncHandler(async(req,res)=>{

    var newArray=[]
    const user= await User.findById(req.params.id)
    for await (const element of user.bucketList){
        if(element._id.toString()!==req.body.id){
            newArray.push(element)
        }
    }
    user.bucketList=newArray
    await user.save();
    const userNew= await User.findById(req.params.id)
    return res.status(200).json(userNew)
})



/**----------------------------------------------
*Descripition de file  
@desc List management : visited list
*@router
    api/tunitour/users/profile/visited-list
@methodes 
    GET - POST - DELETE 
@access 
    priavte : only user 
  
*
-------------------------------------------------*/

const  getAlreadyVistited = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        return res.status(200).json(user.visitedList)
    }else{
        return res.status(404).json({message:"User Not Found"})
    }
})



const  addToAlreadyVistitedList = asyncHandler(async(req,res)=>{
    var existe=false
    const place= await Place.findById(req.body.id)
    if(!place){
        return res.status(404).json({message:"not found"})
    }
    const user = await User.findById(req.params.id)

    for await (const element of user.bucketList){
        if(element._id.toString()===req.body.id){
            existe=true
        }
     }
     if(existe===true){
        var newArray=[]
        for await (const element of user.bucketList){
            if(element._id.toString()!==req.body.id){
                newArray.push(element)
            }
        }
        user.bucketList=newArray
        await user.save();
    }

    const user2 = await User.findByIdAndUpdate(req.params.id,
        {$addToSet:{"visitedList":place}})
    return res.status(200).json(user2)
})



const  deleteAlreadyVistitedList = asyncHandler(async(req,res)=>{

    var newArray=[]
    const user= await User.findById(req.params.id)
    console.log(user.bucketList)
    for await (const element of user.visitedList){
        if(element._id.toString()!==req.body.id){
            newArray.push(element)
        }
    }
    user.visitedList=newArray
    await user.save();
    const userNew= await User.findById(req.params.id)
    return res.status(200).json(userNew.visitedList)
})


const  deleteProfileUser = asyncHandler(async(req,res)=>{

    //etape 1 : get the user from DB
    const deleteUser = await User.findOneAndDelete({ _id: req.params.id })
    const deleteComment = await Comment.deleteMany({user:req.params.id})
    const deleteRatePlace = await Rate.deleteMany({user:req.params.id})
    const deleteRateActivity = await rateActivity.deleteMany({user:req.params.id})
    const deleteAccount = await Account.deleteMany({idUser:req.params.id})
    const deleteCode = await Code.deleteMany({idUser:req.params.id})
    const places = await Place.find()
    for await(const place of places){
        const isAlreadyLiked = place.likes.find((user)=>user.toString()===req.params.id)
        if(isAlreadyLiked){
            place= await Place.findByIdAndUpdate(place.id,{
                $pull:{likes:req.params.id}
            })

        }

    }
    res.status(200).json({message:"Deleted"})


})

















module.exports={
    getProfileClient,
    getAllProfileUsers,
    updateProfileUser,
    updateProfileUserPhoto,
    getBucketList,
    getAlreadyVistited,
    addToBucketList,
    deleteFromBucketList,
    addToAlreadyVistitedList,
    deleteAlreadyVistitedList,
    deleteProfileUserPhoto,
    deleteProfileUser
}



