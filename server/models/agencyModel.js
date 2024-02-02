const mongoose=require("mongoose")
const Joi = require("joi");
const { required } = require("joi");

//Agency schema 

const agencySchema=new mongoose.Schema({
    name:{
        type:String ,
        required: true,
        trim:true,
        minLength:2,
        maxLength:100
    },
   
    picture:{
        type: Object,
            default:{
                url: "",
                publicId: null,
            },},
            
    url:{
        type: String,
        required: true,
    },
   
    
    

},
{timestamps:true}
)

// endroit model 
const Agency = mongoose.model("agency",agencySchema);
//validation create agency 
function validateCreateAgency(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100).required(),
      url:Joi.string().trim().required(),
    


 
     
    })
    return schema.validate(obj)
}

//validation update agency 
function validateUpdateAgency(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100),
      url:Joi.string().trim().min(10),
    
     
    })
    return schema.validate(obj)
}

module.exports={
  Agency, validateCreateAgency, validateUpdateAgency
}