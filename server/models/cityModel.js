const mongoose=require("mongoose")
const Joi = require("joi");
const { required } = require("joi");

//endroit schema 

const citiesSchema=new mongoose.Schema({
   
    name:{
        type:String ,
        required: true,
        trim:true,
        minLength:2,
        unique:true
    },
    description:{
        type:String ,
        required: true,
        trim:true,
        minLength:10
    },

    pictures:
        [],

},
{timestamps:true}
)

// endroit model 
const Cities = mongoose.model("cities",citiesSchema);
//validation crate endroit 
function validateCreateCity(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100).required(),
      description:Joi. string().trim().min(10).required(),
      pictures:Joi.array()
    })
    return schema.validate(obj)
}

//validation update endroit 
function validateUpdateCity(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100),
      description:Joi.string().trim().min(10),
    })
    return schema.validate(obj)
}

module.exports={
    Cities, validateUpdateCity,validateCreateCity
}