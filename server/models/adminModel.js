const mongoose = require("mongoose")
//The most powerful schema description language and data validator for JavaScript.
const Joi = require("joi")
//token 
const jwt= require("jsonwebtoken");
const { boolean, string, number } = require("joi");

//admin Schema
// adminschema a class 
const AdminSchema=new mongoose.Schema({
     
      adminname:{
        type:String ,
        required: true,
        trim:true,
        minLength:2,
        maxLength:100
      },
      lastname:{
        type: String ,
     
        trim:true,
        minLength:2,
        maxLength:100
      },
      email:{
        type: String,
        required: true,
        trim:true,
        minLength:5,
        maxLength:100,
        unique:true,
      },
      password:{
        type: String,
        required: true,
        trim:true,
        minLength:8,
      },
      profilepicture:{
        type: Object,
            default:{
                url: "https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_960_720.jpg",
                publicId: null,
            },
        
      },
      bio:{
        type:String
      },
      
      age:{
        type:String
      },
      address:{
        type:String 
      },
      phone:{
        type:String 
      },
      isAdmin:{
        type: Boolean,
        default: true, 
      },
      isAccountVerified:{
        type: Boolean,
        default: false, 
      }}
      );
//generate the login token 
// you can't write it with arrow function 
// must always be before the model 
AdminSchema.methods.generateLoginToken = function (){
  return jwt.sign({
      id:this._id, isAdmin:this.isAdmin,
  },
  process.env.PRIVATE_KEY
  )
}
//admin model 
const Admin = mongoose.model("admin", AdminSchema)
//var Admin = mongoose.model.admin|| mongoose.model("Admin",UserSchema)


//valisation de login de l'admin 

function validateLoginAdmin(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(8).required().email(),
        password:Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj)
}
//valisation de login de l'admin 

function validateSignupAdmin(obj){
  const schema=Joi.object({
      email:Joi.string().trim().min(8).required().email(),
      password:Joi.string().trim().min(8).required(),
      adminname:Joi.string().trim()
  })
  return schema.validate(obj)
}
// validate update admin 
//l'admin peut changer ces donnes 
function validateUpdateAdmin(obj){
  const schema=Joi.object({
      adminname:Joi.string().trim().min(3).max(100),
      lastname:Joi.string().trim().min(3),
    //  password:Joi.string().trim().min(8),
      bio:Joi.string(),
      phone:Joi.string(),
      age:Joi.string(),
      address:Joi.string(),
      email:Joi.string(),

  })
  return schema.validate(obj)
}

//validate Email

function validateEmail(obj){
  const schema=Joi.object({
      email:Joi.string().trim().min(8).required().email(),
  })
  return schema.validate(obj)
}

//validate new password 

var validateNewPasswordupdate=(admin)=>{
  const AdminSchema =Joi.object({
      oldPass:Joi.string().trim().min(6),
      newPass:Joi.string().trim().min(6),
      confirmPass:Joi.string().trim().min(6),
    })
    return AdminSchema.validate(admin)
}

function validateNewPassword(obj){
  const schema =Joi.object({
       password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}

module.exports={
    Admin,validateLoginAdmin,validateUpdateAdmin,
    validateEmail,validateNewPassword,validateNewPasswordupdate,
    validateSignupAdmin

}
