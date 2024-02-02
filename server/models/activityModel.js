const mongoose=require("mongoose")
const Joi = require("joi");
const { required } = require("joi");
const ObjectId = mongoose.Types.ObjectId;
//activity schema 

const activitySchema=new mongoose.Schema({
   
    name:{
        type:String ,
        required: true,
        trim:true,
        minLength:2,
        maxLength:30
    },
    description:{

        type:String ,
        default:null,
        required: true,
        trim:true,
        minLength:10
    },
    picture:{
        type: Object,
            default:{
                url: "",
                publicId: null,
            },
    },
    rating:{
        nbEval:{
            type:Number,
            default:0,
        }  ,
        valueOfRating:{
            type:Number,
            default:0,
        }      
    }

},
{timestamps:true}
)

// activity model 
const Activity = mongoose.model("activities",activitySchema);

//validation create activity
function validateCreateAcivity(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100).required(),
      description:Joi. string().trim().min(10).required(),
    })
    return schema.validate(obj)
}

//validation update activity
function validateUpdateActivity(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100),
      description:Joi.string().trim().min(10), 
    })
    return schema.validate(obj)
}

module.exports={
    Activity, validateCreateAcivity, validateUpdateActivity
}