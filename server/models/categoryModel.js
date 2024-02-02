const mongoose=require("mongoose");
const Joi = require("joi");


// Category schema
const categoriesSchema = new mongoose.Schema({
   
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:30,
        unique:true   
    },
},{
    timestamps:true,
})

//verification token Model 
const Category = mongoose.model("categories", categoriesSchema)



//validate create category 

function validateCreateCategory(obj){
    const schema=Joi.object({
        title:Joi.string().trim().min(2).max(30).required().label("title"),
    })
    return schema.validate(obj)
}


//validation update category 
function validateUpdateCategory(obj){
    const schema =Joi.object({
        title:Joi.string().trim().required().label("title"),
    })
    return schema.validate(obj)
}


module.exports={
    Category,validateCreateCategory , validateUpdateCategory
}