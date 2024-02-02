const mongoose = require("mongoose")
const Joi = require("joi");



const RateActivity = new mongoose.Schema({

    placeId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"places" ,
        require:true,
    },
    activityId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"activities" ,
        require:true,
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users" ,
        require:true,
    },
    notice:{
        type:Number,
        require:true
    },

    


},{
    //le temps de creation 
    timestamps:true,
}); 

//post Model
var rateActivity= mongoose.model.rateActivity || mongoose.model("rateActivity",RateActivity)


//validation : creation 
function validationCreationRateActivity(obj){
    const schema =Joi.object({
        placeId:Joi.string().required(),
        activityId:Joi.string().required(),
        notice:Joi.number().required(),

    })
    return schema.validate(obj)
}
//validation : update 
function validationUpdateRateActivity(obj){
    const schema =Joi.object({
        notice:Joi.number().required(),
    })
    return schema.validate(obj)
}


module.exports={
    rateActivity,
    validationCreationRateActivity,
    validationUpdateRateActivity
}