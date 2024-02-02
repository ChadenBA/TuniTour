const mongoose=require("mongoose")
const Joi = require("joi");
const { required } = require("joi");

//endroit schema 

const placeSchema=new mongoose.Schema({

   
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
    categories:[
    
        {type:mongoose.Schema.Types.ObjectId,
        ref:"categories"}
    ],


    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cities"
    },
    pictures:[],
    likes:[
        {
       type:mongoose.Schema.Types.ObjectId,
       ref:"user"
        }
   ],
   activities:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"activities"
    }
],
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
{   
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}}
);

//populate comment for post 
//virtual pour ajouter des attribut virtual a schema place 
//bch yaaaml att esmha comments , 
//baad bch yemchi ychouf ref lena model thez 'ali hia comments' baaad bch ychouf placeId ali fil commentaire w baaad bch ykarenha beli collection ali aandou baad yjibha
placeSchema.virtual("comments",{
    ref:"comment",
    foreignField:"placeId",
    localField:"_id"
})

// endroit model 
const Place = mongoose.model("place",placeSchema);
//validation crate endroit 
function validateCreateEndroit(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100).required(),
      description:Joi. string().trim().min(10).required(),
      city:Joi. string().trim().required(),
      activities:Joi.array(),
      categories:Joi.array(),
    })
    return schema.validate(obj)
}

//validation update endroit 
function validateUpdateEndroit(obj){
    const schema =Joi.object({
      name:Joi. string().trim().min(2).max(100),
      description:Joi.string().trim().min(10),
      city:Joi. string().trim(),
      actId:Joi.array(),
      catId:Joi.array(),
    })
    return schema.validate(obj)
}

module.exports={
    Place , validateUpdateEndroit,validateCreateEndroit
}