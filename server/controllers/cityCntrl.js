const fs=require('fs')
const path=require("path")
const asyncHandler= require("express-async-handler")
const { validateCreateCity, validateUpdateCity, Cities } = require("../models/cityModel")
const {cloudinaryUploadImage, cloudinaryRemoveImage} =require("../utils/cloudinary")
const {Place} =require("../models/PlaceModel")

/**
 *@desc craete new city
 *@route api/cities
 *@method POST
 *@access private (only admin)
 */

 module.exports.createCityCntrl=asyncHandler(async(req,res)=>{
    //les etape de creation 
    const imagesArray=[];
    //1.validation for the image 
    if(!req.files){
        return res.status(400).json({message:"no image provided"})
    }
    //2.validation for data 
    const {error}=validateCreateCity(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    //3.upload photo 
    for await (const element of req.files){
        const pathImage = path.join(__dirname,`../images/${element.filename}`)
        const result= await cloudinaryUploadImage(pathImage)
        imagesArray.push({url:result.secure_url,publicId:result.public_id})
    }
    //4.create new endroit and save it to the db 
    //cette methode fait le sauvgarde automatique 
    const city = await Cities.create({
        name:req.body.name,
        description:req.body.description,
        pictures:imagesArray,
    
    });

    //5.send response to the client 
    res.status(201).json(city);
    //6.remove mage from the server 
    for await (const element of req.files){
        const pathImage = path.join(__dirname,`../images/${element.filename}`)
        fs.unlinkSync(pathImage)}
 })

 /**
 *@desc get all cities
 *@route api/cities
 *@method Get
 *@access public
 */

 module.exports.getAllCitiesCntrl=asyncHandler(async(req,res)=>{
    const cities = await Cities.find()
    if(cities){
        return res.status(200).json(cities)
    }else{
        return res.status(404).json({message:"Cities Not Found"})
    }
    
 })


 /**----------------------------------------------
*Descripition de file  
@desc profile management

*@router
    api/tunitour/user
@methodes 
    POST - Get - DELETE - UPDATE
@access 
    public - private
  
*
-------------------------------------------------*/
module.exports.postCityImag = asyncHandler(async(req,res)=>{

    const city = await Cities.find()
    if(!city){
        return res.status(404).json({message:"City Not Found"})

    }

    const updateCityImg  = await User.findByIdAndUpdate({nom:req.params.nom},{
        $set : {
            pictures:req.body.url
            }
        },{new:true}).select("-password")

        res.status(200).json({message:"successfully"})
})



 /**
 *@desc get single city
 *@route api/cities/:id
 *@method Get
 *@access public
 */

 module.exports.getSingleCityCntrl=asyncHandler(async(req,res)=>{
    const city =await Cities.findById(req.params.id)
    if(!city){
        return res.status(400).json({message:"city not found "})
    }


    res.status(200).json(city)
 })
 

 /**
 *@desc get city count 
 *@route api/cities/count 
 *@method Get
 *@access public
 */

 module.exports.getCityCountCntrl=asyncHandler(async(req,res)=>{
    const count =await Cities.count();
    res.status(200).json(count)
 })

 /**
 *@desc delete city
 *@route api/cities/:id
 *@method delete 
 *@access only admin
 */

 module.exports.deleteCityCntrl=asyncHandler(async(req,res)=>{
    const city=await Cities.findById(req.params.id)
    
    if(!city){
        return res.status(400).json({message:"city not found "})
    }

    //authorization just for the admin
    if(req.admin.isAdmin){
          // Delete all the places that belong to the city
    await  Place.deleteMany({ city: req.params.id });

        //supp de endroit from the db
        await Cities.findByIdAndDelete(req.params.id);
        //supp de endroit image from the cloudinary 
        await cloudinaryRemoveImage(city.pictures.publicId);

        res.status(200).json({message:"city has benn deleted ",cityId:city.id})
    }else{
        res.status(403).json({message:"Acess dined "})
    }


 })


 /**
 *@desc update city
 *@route api/cities/:id
 *@method PUt
 *@access private (only admin)
 */

 module.exports.UpdateCityCntrl=asyncHandler(async(req,res)=>{
    //les etape 
    //1.validation 
    const {error}=validateUpdateCity(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //2.get the endroit from db and check if exist 
    const city= await Cities.findById(req.params.id);
    if(!city){
        return res.status(400).json({message:`city not found `})
    }

    //3. update endroit 
    const UpdatedCity = await Cities.findByIdAndUpdate(req.params.id,{
       $set:{
         name:req.body.name,
         description:req.body.description,
         }
    }, {new : true})


    //4.send response to client 
    res.status(200).json(UpdatedCity)
 })

 /**
 *@desc update city picture
 *@route api/endroits/update-image/:id
 *@method PUT
 *@access private (only admin)
 */

//  module.exports.UpdateCityImageCntrl=asyncHandler(async(req,res)=>{
//     //les etape 
//     //1.validation 
//     if(!req.file){
//         return res.status(400).json({message:"No Image Provided"})
//     }
//     console.log(req.params)
//     //etape 2 : find place 
//     const city=  await Cities.findById(req.params.id);
//     if(!city){
//          return res.status(400).json({message:"city not found "})
//         }
//         console.log(req.params)
//         // delete the old picture
//      const element = await city.pictures.find(({publicId})=>publicId===req.params)
//      console.log(req.params)
//      await cloudinaryRemoveImage(element?.publicId)
//      await city.pictures.splice(element,req.params);
//     //etape 3 : upload photo
//      const pathImage = path.join(__dirname,`../images/${req.file.filename}`)
//     //etape 3 : upload to cloudinary
//     const result = await cloudinaryUploadImage(pathImage)

//     //etape 4 : add to pictures array 
//     city?.pictures.push({url:result.secure_url,publicId:result.public_id})
    
//     // etape 5 : update db
//     const  updateImg = await Cities.findByIdAndUpdate(req.params.id,{
//         $set:{
//             pictures:city?.pictures
//         }
//     },{new:true})
//     console.log(updateImg)
//     //etape 6 : send response to the client 
//     res.status(201).json(updateImg)
//     //etape 7 : remove image from server 
//     fs.unlinkSync(pathImage)
//  })
module.exports.UpdateCityImageCntrl = asyncHandler(async (req, res) => {
    // 1. Validation
    if (!req.file) {
      return res.status(400).json({ message: "No Image Provided" });
    }
  
    // 2. Find city
    const city = await Cities.findById(req.params.id);
    if (!city) {
      return res.status(400).json({ message: "City not found" });
    }
  //delete the old picture 
    const element = await city.pictures.find(
        ({ publicId }) => publicId === req.params
      );
      await city.pictures.splice(element, 1);
      await cloudinaryRemoveImage(element?.publicId);
    // 4. Upload new photo
    const pathImage = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(pathImage);
  
    // 5. Add new picture to the array
    city.pictures.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  
    // 6. Update the city in the database
    const updatedCity = await Cities.findByIdAndUpdate(
      req.params.id,
      { pictures: city.pictures },
      { new: true }
    );
  
    // 7. Remove image from server
    fs.unlinkSync(pathImage);
  
    // 8. Send response to the client
    res.status(201).json(updatedCity);
  });
  

/**
 *@desc delete endroit picture
  *@route api/cities/update-image/:id/imageId
  *@method Delete
  *@access private (only admin)
//  */


module.exports.deleteImgCtrl=asyncHandler(async(req,res)=>{

    //params
   // const {idplace,idImg} = req.params
    //get place
    const city=await Cities.findById(req.params.id)
   
    //find element  in pictures
    const element = await city.pictures.find(({publicId})=>publicId===req.params.imageId)
    console.log(element)
    //validation 
    if(city.pictures.length <= 1){
        return res.status(401).json({message:"you can't delete the picture"})
    }
    else{
        await city.pictures.splice(element,1)
    }
    if (city?.pictures == null) {
        return res.status(404).json({ message: "Pictures array not found" });
      }
    
    //update in DB and send result to client
    const  updateImg = await Cities.findByIdAndUpdate(req.params.id,{
        $set:{
            pictures:city?.pictures
        }
    },{new:true})

    return res.status(200).json(updateImg)


})

 