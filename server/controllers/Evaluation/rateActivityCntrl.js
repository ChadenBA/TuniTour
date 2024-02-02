const asyncHandler = require("express-async-handler")
const {rateActivity,validationCreationRateActivity,validationUpdateRateActivity}= require("../../models/RateActivityModel")
const {User} =require("../../models/UserModel")
const { Place } = require("../../models/PlaceModel")
const {Activity}=require("../../models/activityModel")


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
module.exports.mangementRateActivityCntrl=asyncHandler(async(req,res)=>{

    //etape 1 : valiadtion for data
    const {error} =validationCreationRateActivity(req.body) 
    if(error){
        return  res.status(400).json({message:error.details[0].message})
    }
    const place = await Place.findById(req.body.placeId)
    const activity = await Activity.findById(req.body.activityId)
    const rate= await rateActivity.findOne({user:{_id:req.user.id},placeId:{_id:req.body.placeId},activityId:{_id:req.body.activityId}})
    if(!rate){
         await rateActivity.create({
            placeId:req.body.placeId,
            activityId:req.body.activityId,
            user:req.user.id,
            notice:req.body.notice
        })
        activity.rating.valueOfRating=((activity.rating.valueOfRating*activity.rating.nbEval)+req.body.notice)/(activity.rating.nbEval+1)
        activity.rating.nbEval=activity.rating.nbEval+1
        await activity.save()
        //etape 4 : send response to the client 
        res.status(201).json(activity)
    }else{
        if(req.user.id===rate.user.toString()){
            if(req.body.notice>0){
                activity.rating.valueOfRating=(((activity.rating.valueOfRating*activity.rating.nbEval)-rate.notice)+req.body.notice)/activity.rating.nbEval
                rate.notice=req.body.notice
                await rate.save()
                await activity.save()
                res.status(201).json(activity)
            }else if(req.body.notice===0){
                if(activity.rating.nbEval===1){
                    activity.rating.valueOfRating=0
                }else{
                    activity.rating.valueOfRating= ((activity.rating.valueOfRating*activity.rating.nbEval)-rate.notice)/(activity.rating.nbEval-1)
                }

                activity.rating.nbEval= activity.rating.nbEval-1
                await rateActivity.findByIdAndDelete(rate._id) 
                await activity.save()
                res.status(200).json(activity)  
            }
        }else{
            //etape  : send response to the client 
            res.status(201).json({message:"access denied , not allowed"})

        }
    }
})






/**----------------------------------------------
*Descripition de file  
@desc rate management

*@router
    api/tunitour/rate/place
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.getAllRatesActivity=asyncHandler(async(req,res)=>{

   
    //etape 1 : get all rates
    const rate = await rateActivity.find().populate({path:"activityId"})

    //etape 2 : send response to the client 
    res.status(201).json(rate)

})


/**----------------------------------------------
*Descripition de file  
@desc rate management

*@router
    api/tunitour/rate/place
@methodes 
    POST 
@access 
    only Admin 
-------------------------------------------------*/
module.exports.moyenneRatingActivityByPlace=asyncHandler(async(req,res)=>{
    var moyenne=0,somme=0
    //etape 1 : get all rates
    const rates = await rateActivity.find({placeId:{_id:req.params.placeId},activityId:{_id:req.params.activityId}})
    for await (const rate of rates){
        somme+= rate.notice
    }
    if(rates.length!==0){
        moyenne=somme/rates.length
    }
    //etape 2 : send response to the client 
    res.status(201).json(moyenne)

})
module.exports.moyenneRatingActivityByPlaceTab=asyncHandler(async(req,res)=>{
    var tabPlace =[]
    var tabMoy=[]
    //etape 1 : get all rates
    const rates = await rateActivity.find({activityId:{_id:req.params.activityId}})
    for await (const rate of rates){
        if(!tabPlace.includes(rate.placeId.toString())){
            tabPlace.push(rate.placeId.toString())
        }
    }
    if(tabPlace.length!==0){
        for await(const idPlace of tabPlace){
            var moyenne=0,somme=0
            const place =await Place.findById(idPlace)
            const ratesValue = await rateActivity.find({placeId:{_id:idPlace},activityId:{_id:req.params.activityId}})
            for await (const value of ratesValue){
                somme+= value.notice
            }
            if(ratesValue.length!==0){
                moyenne=somme/ratesValue.length
            } 
            tabMoy.push({moyenne:moyenne ,placeName:place.name})
        }

    }
    //etape 2 : send response to the client 
    res.status(201).json(tabMoy)

})