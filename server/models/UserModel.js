const mongoose = require("mongoose")
const Joi = require("joi");
const jwt = require("jsonwebtoken")



const UserSchema = new mongoose.Schema({
    firstName : {
        type:String, 
        trim:true,
        require:true,
        minlength:2,
        maxlength:15,
        }, 
    lastName : {
        type:String, 
        require:true,
        trim:true,
        minlength:2,
        maxlength:15,
    },
    age:{
        type:Number, 
        default:null
    } ,
    email : {
        type:String, 
        require:true,
        trim:true,
        unique:true
    },
    nationality:{
        type:String, 
        default:null
    },
    bio:{
        type:String, 
        default:""
    },
    adress:{
        type:String, 
        default:null
    },
    phone:{
        type:String, 
        default:null
    },
    photoProfile:{
        type:Object,
        default:{
            url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
            publicId:null,
        }
    },
    password : {
        type:String,
         trim:true,
         minlength:6,
        }, 
    visitedList:{
        type:Array,
        defautl:[]
    },
    bucketList:{
        type:Array,
        defautl:[]
    },
    
},{
    //le temps de creation 
    timestamps:true,
}); 

//generation token automatique
UserSchema.methods.generateTokenAuth = function (){
    return jwt.sign({
        id:this._id, 
    },
    process.env.PRIVATE_KEY
    )
}
var User = mongoose.model.users || mongoose.model("User",UserSchema)


//Validation Sign Up User : 
var validationSignup = (user)=>{

   
    const schemaUser =Joi.object({
        firstName:Joi.string().trim().min(2).max(100).required(),
        lastName:Joi.string().trim().min(2).max(100).required(),
        email:Joi.string().trim().min(8).max(30).required().email(),
        password:Joi.string().trim().min(6).required(),
        age:Joi.number(),
        nationality:Joi.string().trim().allow(""),
        phone:Joi.string().trim().allow(""),
        adress:Joi.string().trim().allow(""),
        bio:Joi.string().trim().allow("")

    })
    return schemaUser.validate(user)
}


 //update : validattion data 
  var validationUpdateData=(user)=>{
    const schemaUser =Joi.object({
        firstName:Joi.string().trim().allow(""),
        lastName:Joi.string().trim().allow(""),
        age:Joi.number().allow(null),
        nationality:Joi.string().trim().allow(""),
        phone:Joi.number().allow(""), 
        adress:Joi.string().trim().allow(""),
        bio:Joi.string().trim().allow("")
      })
      return schemaUser.validate(user)
  }
 //change password :  validattion data 
 var validationChangePassword=(user)=>{
    const schemaUser =Joi.object({
        oldPass:Joi.string().trim().min(6),
        newPass:Joi.string().trim().min(6),
        confirmPass:Joi.string().trim().min(6),
      })
      return schemaUser.validate(user)
  }

  
module.exports={
    User,
    validationSignup,
    validationUpdateData,
    validationChangePassword

}