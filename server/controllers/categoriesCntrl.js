
const asyncHandler= require("express-async-handler")
const { validateCreateCategory, validateUpdateCategory, Category } = require("../models/categoryModel")


/**
 *@desc craete new category 
 *@route api/categories
 *@method POST
 *@access private (only admin)
 */

 module.exports.createCtegoryCntrl=asyncHandler(async(req,res)=>{
    //les etape de creation 
    //1.validation for data 
    const {error}=validateCreateCategory(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    //2.create new category and save it to the db 
    //cette methode fait le sauvgarde automatique 
    const category = await Category.create({
        title:req.body.title,
    });

    //3.send response to the client 
    res.status(201).json(category)
 })



 /**
 *@desc get all categories 
 *@route api/categories
 *@method GET
 *@access private (only admin)
 */

 module.exports.getallCtegoryCntrl=asyncHandler(async(req,res)=>{
    const categories = await Category.find()
    if(categories){
        return res.status(201).json(categories)
    }else {
        return res.status(404).json({message:"NOT FOUND"})
    }
 })



 /**
 *@desc update category
 *@route api/categories/:id
 *@method PUt
 *@access private (only admin)
 */

 module.exports.UpdateCategoryCntrl=asyncHandler(async(req,res)=>{
    //les etape 
    //1.validation 
    const {error}=validateUpdateCategory(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //2.get the cat from db and check if exist 
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(400).json({message:` category not found `})
    }

    //3. update cat
    const UpdatedCategory= await Category.findByIdAndUpdate(req.params.id,{
       $set:{
         title:req.body.title,
       }
    }, {new : true})


    //4.send response to client 
    res.status(200).json(UpdatedCategory)
 })

 /**
 *@desc delete categories 
 *@route api/categories/:id
 *@method Delete
 *@access private (only admin)
 */

 module.exports.deleteCtegoryCntrl=asyncHandler(async(req,res)=>{
    const category =await Category.findById(req.params.id)
    
    if(!category){
        return res.status(400).json({message:"category not found "})
    }

   
        //supp de cat from the db
        await Category.findByIdAndDelete(req.params.id);
       
        res.status(200).json({message:"category has benn deleted ",
        categoryId:category._id})


 })


 /**----------------------------------------------
*Descripition de file  
@desc Activies management

*@router
    api/tunitour/activities/
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/

module.exports.getAllCategories=asyncHandler(async(req,res)=>{

    const categories = await Category.find()
    if(categories){
        return res.status(201).json(categories)
    }else {
        return res.status(404).json({message:"NOT FOUND"})
    }
   
    
})

