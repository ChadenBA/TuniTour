const mongoose = require("mongoose")
const Joi = require("joi");



const rateSchema = new mongoose.Schema({
    placeId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"places" ,
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
var Rate= mongoose.model.rates || mongoose.model("rateplace",rateSchema)


//validation : creation 
function validationCreationRate(obj){
    const schema =Joi.object({
        placeId:Joi.string().required(),
        notice:Joi.number().required(),

    })
    return schema.validate(obj)
}


//validation : update
function validationUpdateRate(obj){
    const schema =Joi.object({
        notice:Joi.number().required(),
    })
    return schema.validate(obj)
}


module.exports={
    Rate,
    validationCreationRate,
    validationUpdateRate,
    
}