const mongoose = require("mongoose")
const Joi = require("joi");


const accountSchema =new  mongoose.Schema({
    email : {
        type:String, 
        require:true,
        trim:true,
        minlength:8,
        maxlength:30,
        unique:true
    },
    password : {
        type:String,
        require:true,
        trim:true,
        minlength:6,
    }, 
    idUser : {
        type:String,
        require:true,
    },
    isAdmin:false
},{
    timestamps:true,
})




var Account = mongoose.model.account || mongoose.model("Account",accountSchema)




//Sign In validattion data 

var validationSignin = (user)=>{
    const schemaUser = Joi.object({
        email:Joi.string().trim().min(8).max(30).required().email(),
        password:Joi.string().trim().min(6).required(),
    })
    return schemaUser.validate(user)
 }


 //validation Email 
 var validationEmail=(user)=>{
    const schemaUser =Joi.object({
         email:Joi.string().trim().min(5).max(30).email(),
      })
      return schemaUser.validate(user)
  }


    
module.exports={
    Account,
    validationSignin,
    validationEmail,
    
}