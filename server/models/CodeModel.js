const mongoose = require("mongoose")
const Joi = require("joi");


const codeSchema =new  mongoose.Schema({
    email : {
        type:String, 
        require:true,
        trim:true,
        minlength:8,
        maxlength:30,
        unique:true
    }, 
    idUser : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
    code:{
        type:String,
        require:true
    }
},{
    timestamps:true,
})




var Code = mongoose.model.code || mongoose.model("code",codeSchema)

     //validation Email 
 var validationCode=(code)=>{
    const schemaCode =Joi.object({
         code:Joi.string().trim().length(6),
      })
      return schemaCode.validate(code)
  }
  
module.exports={
    Code,
    validationCode
}