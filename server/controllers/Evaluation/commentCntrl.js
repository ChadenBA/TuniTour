const asyncHandler = require("express-async-handler")
const { model } = require("mongoose")
const {Comment,validationUpdateComment,validationCreationComment}= require("../../models/commentModel")
const {User} =require("../../models/UserModel")
const { use } = require("../../routes/loginRoute")


/**----------------------------------------------
*Descripition de file  
@desc comment management

*@router
    api/tunitour/comments/
@methodes 
    POST 
@access 
    only User 
-------------------------------------------------*/
module.exports.creactionCommentCTRL=asyncHandler(async(req,res)=>{
    //etape 1 : valiadtion for image
    const {error} =validationCreationComment(req.body) 
    if(error){
        return  res.status(400).json({message:error.details[0].message})
    }
    //etape 2 : get user
    const user = await User.findById(req.user.id)
    console.log(user)

    //etape 3 : comment creation
    const comment = await Comment.create({
        placeId:req.body.placeId,
        user:req.user.id,
        userName:user.firstName+" "+user.lastName,
        text:req.body.text

    })
     //etape 4 : send response to the client 
    res.status(201).json(comment)

})



/**----------------------------------------------
*Descripition de file  
@desc comment management

*@router
    api/tunitour/comments/
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.getAllComments=asyncHandler(async(req,res)=>{

   
    //etape 1 : get all comments
    const comment = await Comment.find().populate({path:"user",model:User})

    //etape 2 : send response to the client 
    res.status(201).json(comment)

})


/**----------------------------------------------
*Descripition de file  
@desc comment management

*@router
    api/tunitour/comments/:id
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.deleteComment=asyncHandler(async(req,res)=>{

   
    //etape 1 : get  comment
    const comment = await Comment.findById(req.params.id)
    if(!comment){
        return  res.status(404).json({message:"Comment Not Found"})

    }

    //validation of deleting 
    if(req.user.id===comment.user.toString()){
        await Comment.findByIdAndDelete(req.params.id)
        //etape 2 : send response to the client 
        res.status(201).json({message:"Comment Has Been Deleted"})
    }
    // else{
    //     //etape 2 : send response to the client 
    //     res.status(401).json({message:"access denied , not allowed"})
    // }
 
})

/**----------------------------------------------
*Descripition de file  
@desc Activies management

*@router
    api/tunitour/comments/:id
@methodes 
    POST 
@access 
    only owner of the comment 
-------------------------------------------------*/
module.exports.updateCommentCntrl=asyncHandler(async(req,res)=>{

   
    //etape 1 : valiadtion 
    const {error} =validationUpdateComment(req.body) 
    if(error){
        return  res.status(400).json({message:error.details[0].message})
    }


    //etape 2 : get  comment
    const comment = await Comment.findById(req.params.id)
    if(!comment){
        return  res.status(404).json({message:"Comment Not Found"})
  
    }

    //validation of deleting 
    if(req.user.id===comment.user.toString()){

        const updateComment = await Comment.findByIdAndUpdate(req.params.id,{
            $set:{
                text:req.body.text
            }
        },{new:true})
        
        //etape 2 : send response to the client 
        res.status(201).json(updateComment)

    }
    // else{

    //     //etape 2 : send response to the client 
    //     res.status(401).json({message:"access denied , Only User Himself Can Edit His Comment"})
    // }
 
})
