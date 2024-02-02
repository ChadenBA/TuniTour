const mongoose = require("mongoose")
const Joi = require("joi");



const commentSchema = new mongoose.Schema({
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
    text:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    }
    


},{
    //le temps de creation 
    timestamps:true,
}); 

//post Model
var Comment= mongoose.model.comments || mongoose.model("comment",commentSchema)


//validation : creation 
function validationCreationComment(obj){
    const schema =Joi.object({
        placeId:Joi.string().required(),
        text:Joi.string().trim().required(),

    })
    return schema.validate(obj)
}

//validation : update
function validationUpdateComment(obj){
    const schema =Joi.object({
        text:Joi.string().trim().required(),
    })
    return schema.validate(obj)
}


module.exports={
    Comment,
    validationCreationComment,
    validationUpdateComment
}