const asyncHandler = require("express-async-handler")
const { Place } = require("../../models/PlaceModel")
const {Rate,validationCreationRate}= require("../../models/RatePlaceModel")
const {User} =require("../../models/UserModel")



/**----------------------------------------------
*Descripition de file  
@desc rate management 

*@router
    api/tunitour/rate/add-rate
@methodes 
    POST 
@access 
    only User 
-------------------------------------------------*/
module.exports.creationRateCntrl=asyncHandler(async(req,res)=>{
    //etape 1 : valiadtion for data
    const {error} =validationCreationRate(req.body) 
    if(error){
        return  res.status(400).json({message:error.details[0].message})
    }
    const place = await Place.findById(req.body.placeId)
    //etape 2 : get user
    await User.findById(req.user.id)
    const rate = await Rate.findOne({user:{_id:req.user.id},placeId:{_id:req.body.placeId}})
    if(!rate && req.body.notice===0){
      return res.status(200).json(place)
    }
    if(rate){
        if(req.body.notice===0){  
            if(place.rating.nbEval===1){
                place.rating.valueOfRating=0
            }else{
                place.rating.valueOfRating= ((place.rating.valueOfRating*place.rating.nbEval)-rate.notice)/(place.rating.nbEval-1)
            }
            place.rating.nbEval= place.rating.nbEval-1
            await Rate.deleteOne({_id:rate.id})
            await place.save()
            res.status(201).json(place)
        }else if(req.body.notice>0){
            place.rating.valueOfRating=(((place.rating.valueOfRating* place.rating.nbEval)-rate.notice)+req.body.notice)/place.rating.nbEval
            await Rate.findByIdAndUpdate(rate._id,{
                $set:{
                    notice:req.body.notice
                }
            },{new:true})
            await place.save()
            res.status(201).json(place)
        }
    }else{
        //etape 3 : rate creation
        await Rate.create({
        placeId:req.body.placeId,
        user:req.user.id,
        notice:req.body.notice
        }) 
        place.rating.valueOfRating=((place.rating.valueOfRating*place.rating.nbEval)+req.body.notice)/(place.rating.nbEval+1)
        place.rating.nbEval=place.rating.nbEval+1
        await place.save()
        //etape 4 : send response to the client 
        res.status(201).json(place)
    }
})

/**----------------------------------------------
*Descripition de file  
@desc rate management

*@router
    api/tunitour/rate/
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.getAllRates=asyncHandler(async(req,res)=>{

   
    //etape 1 : get all rates
    const rate = await Rate.find()

    //etape 2 : send response to the client 
    res.status(201).json(rate)

})

/**----------------------------------------------
*Descripition de file  
@desc rate management

*@router
    api/tunitour/rate/
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.getUserRates=asyncHandler(async(req,res)=>{

    //etape 1 : get user
    const user = await User.findById(req.user.id)

    //etape 1 : get all rates
    const rate = await Rate.find({user:{_id:req.params.id}})

    //etape 2 : send response to the client 
    res.status(201).json(rate)

})

/**----------------------------------------------
*Descripition de file  
@desc rate management

*@router
    api/tunitour/rate/
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.getUserPlaceRates=asyncHandler(async(req,res)=>{

    //etape 1 : get user
    const user = await User.findById(req.user.id)

    //etape 1 : get all rates
    const rate = await Rate.find({user:{_id:req.params.id},placeId:{_id:req.params.placeId}})

    //etape 2 : send response to the client 
    res.status(201).json(rate)

})


/**----------------------------------------------
*Descripition de file  
@desc comment management

*@router
    api/tunitour/rate/count
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.countRates=asyncHandler(async(req,res)=>{

   
    //etape 1 : get all rates
    const count = await Rate.count()

    //etape 2 : send response to the client 
    res.status(201).json(count)

})


/**----------------------------------------------
*Descripition de file  
@desc comment management : count rate places

*@router
    api/tunitour/rate/:id/count
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.moyenneRatePlace=asyncHandler(async(req,res)=>{

    var moy=0,somme=0
    
    //etape 1 : get all rates
    const rates = await Rate.find({placeId:{_id:req.params.id}})
    for await(const rate of rates ){
        somme+=rate.notice
    }
    moy= somme/rates.length
    //etape 2 : send response to the client 
    res.status(201).json(moy)

})