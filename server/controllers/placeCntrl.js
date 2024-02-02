const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  validateCreateEndroit,
  validateUpdateEndroit,
  Place,
} = require("../models/PlaceModel");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const cloudinary = require("cloudinary");

/**
 *@desc craete new endroit
 *@route api/endroits
 *@method POST
 *@access private (only admin)
 */

module.exports.createEndroitCntrl = asyncHandler(async (req, res) => {
  //les etape de creation
  const imagesArray = [];
  //1.validation for the image
  if (!req.files) {
    return res.status(400).json({ message: "no image provided" });
  }
  //2.validation for data
  const { error } = validateCreateEndroit(req.body);
  console.log(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //3.upload photo

  for await (const element of req.files) {
    const pathImage = path.join(__dirname, `../images/${element.filename}`);
    const result = await cloudinaryUploadImage(pathImage);
    imagesArray.push({ url: result.secure_url, publicId: result.public_id });
  }

  //4.create new endroit and save it to the db
  //cette methode fait le sauvgarde automatique
  const endroit = await Place.create({
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
    activities: req.body.activities,
    pictures: imagesArray,
    city: req.body.city,
  });

  console.log(res.body);
  //5.send response to the client
  res.status(201).json(endroit);
  //6.remove mage from the server
  for await (const element of req.files) {
    const pathImage = path.join(__dirname, `../images/${element.filename}`);
    fs.unlinkSync(pathImage);
  }
});

/**----------------------------------------------
*Descripition de file  
@desc  get  all places

*@router
    api/tunitour/places/
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/
module.exports.getPlaces = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const POST_PRE_PAGE = 3;
  let places;

  if (pageNumber) {
    places = await Place.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * POST_PRE_PAGE)
      .limit(POST_PRE_PAGE)
      .populate({ path: "categories" })
      .populate({ path: "activities" })
      .populate({ path: "city" })
      .populate({ path: "comments" });
  } else {
    places = await Place.find()
      .sort({ createdAt: -1 })
      .populate({ path: "categories" })
      .populate({ path: "activities" })
      .populate({ path: "city" })
      .populate({ path: "comments" });
  }

  if (places) {
    return res.status(201).json(places);
  } else {
    return res.status(404).json({ message: "Not Found" });
  }
});

/**----------------------------------------------
*Descripition de file  
@desc get single  place 

*@router
    api/tunitour/places/
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/

module.exports.getSinglePlace = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id)
    .populate({ path: "categories" })
    .populate({ path: "activities" })
    .populate({ path: "city" })
    .populate({ path: "comments" });

  if (!place) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.status(201).json(place);
});

/**
 *@desc get single endroit
 *@route api/endroits/:id
 *@method Get
 *@access public
 */

module.exports.getSingleEndroitCntrl = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id)
    .populate({ path: "categories" })
    .populate({ path: "activities" })
    .populate({ path: "city" })
    .populate({ path: "comments" });

  if (!place) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.status(201).json(place);
});

/**
 *@desc get endroit count
 *@route api/endroits/count
 *@method Get
 *@access public
 */

module.exports.getEndroitCountCntrl = asyncHandler(async (req, res) => {
  const count = await Place.count();
  res.status(200).json(count);
});

/**----------------------------------------------
*Descripition de file  
@desc get by  categories

*@router
    api/tunitour/places/categories/:id
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/
module.exports.getByCategory = asyncHandler(async (req, res) => {
  let result = [];
  const idCat = req.params.id;
  const places = await Place.find()
    .sort({ createdAt: -1 })
    .populate({ path: "categories" })
    .populate({ path: "activities" })
    .populate({ path: "city" })
    .populate({ path: "comments" });

  places.forEach((place) => {
    place.categories.forEach((category) => {
      if (category._id.toString() === idCat) {
        result.push(place);
      }
    });
  });

  if (result.length) {
    res.status(201).json(result);
  } else {
    res.status(404).json({ message: "Not Found Places With This Category" });
  }
});

/**----------------------------------------------
*Descripition de file  
@desc get by activities

*@router
    api/tunitour/places/activities/:id
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/
module.exports.getByActivity = asyncHandler(async (req, res) => {
  let result = [];
  const idAct = req.params.id;
  const places = await Place.find()
    .sort({ createdAt: -1 })
    .populate({ path: "categories" })
    .populate({ path: "activities" })
    .populate({ path: "city" })
    .populate({ path: "comments" });

  places.forEach((place) => {
    place.activities.forEach((activity) => {
      if (activity._id.toString() === idAct) {
        result.push(place);
      }
    });
  });

  if (result.length) {
    res.status(201).json(result);
  } else {
    res.status(404).json({ message: "Not Found Places With This Activity" });
  }
});

/**----------------------------------------------
*Descripition de file  
@desc get by city

*@router
    api/tunitour/places/cities/:id
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/
module.exports.getByCity = asyncHandler(async (req, res) => {
  let result = [];
  const idCity = req.params.id;
  const places = await Place.find()
    .sort({ createdAt: -1 })
    .populate({ path: "categories" })
    .populate({ path: "activities" })
    .populate({ path: "city" })
    .populate({ path: "comments" });
  places.forEach((place) => {
    if (place.city._id.toString() === idCity) {
      result.push(place);
    }
  });

  if (result.length !== 0) {
    res.status(201).json(result);
  } else {
    res.status(200).json([]);
  }
});
/**----------------------------------------------
*Descripition de file  
@desc place management

*@router
    api/tunitour/places/likes/:id
@methodes 
    GET 
@access 
    public 
-------------------------------------------------*/
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: placeId } = req.params;

  let place = await Place.findById(placeId);

  if (!place) {
    return res.status(404).json({ message: "Not Found Place" });
  }
  const isAlreadyLiked = place.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isAlreadyLiked) {
    place = await Place.findByIdAndUpdate(
      placeId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    place = await Place.findByIdAndUpdate(
      placeId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );
  }
  res.status(201).json(place);
});

/**
 *@desc delete endroit
 *@route api/endroits/:id
 *@method delete
 *@access only admin
 */

module.exports.deleteEndroitCntrl = asyncHandler(async (req, res) => {
  const endroit = await Place.findById(req.params.id);

  if (!endroit) {
    return res.status(400).json({ message: "endroit not found " });
  }

  //authorization just for the admin
  if (req.admin.isAdmin) {
    //supp de endroit from the db
    await Place.findByIdAndDelete(req.params.id);
    //supp de endroit image from the cloudinary
    await cloudinaryRemoveImage(endroit.pictures.publicId);

    res
      .status(200)
      .json({ message: "endroid has benn deleted ", endroitId: endroit.id });
  } else {
    res.status(403).json({ message: "Acess dined " });
  }
});

/**
 *@desc update endroit
 *@route api/endroits/:id
 *@method PUt
 *@access private (only admin)
 */

module.exports.UpdateEndroitCntrl = asyncHandler(async (req, res) => {
  //les etape
  //1.validation
  const { error } = validateUpdateEndroit(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //2.get the endroit from db and check if exist
  const endroit = await Place.findById(req.params.id);
  if (!endroit) {
    return res.status(400).json({ message: `place not found ` });
  }

  //3. update endroit
  const UpdatedEndroit = await Place.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        categories: req.body.catId,
        activities: req.body.actId,
        city: req.body.city,
      },
    },
    { new: true }
  );

  //4.send response to client
  res.status(200).json(UpdatedEndroit);
});

//  /**
//  *@desc update endroit picture
//  *@route api/endroits/update-image/:id/
//  *@method PUT
//  *@access private (only admin)
//  */

//  module.exports.UpdateEndroitImageCntrl=asyncHandler(async(req,res)=>{
//     //les etape
//     //1.validation
//     if(!req.file){
//         return res.status(400).json({message:"no image provided"})
//     }

//     //2.get the endroit from db and check if exist
//     const endroit = await Place.findById(req.params.id);
//     if(!endroit){
//         return res.status(400).json({message:`place not found `})
//     }
//     //3. delete the old image
//     if(endroit.pictures.publicId !== null){
//      await cloudinaryRemoveImage(endroit.pictures?.publicId)
//     }
//     //4. upload new photo
//      const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
//      const result= await cloudinaryUploadImage(imagePath);
//      console.log(result);
//      //5. update the image field in the  db
//      const UpdatedEndroit = await Place.findByIdAndUpdate(req.params.id,
//         {
//         $set:{
//          pictures:{
//             url:result?.secure_url,
//             publicId:result?.public_id,
//          },
//         },
//      }, {new : true});

//      //6. send response to the client
//      res.status(200).json(UpdatedEndroit)
//      //7. remove image from the server
//      fs.unlinkSync(imagePath)
//  }

/**
 *@desc delete endroit picture
  *@route api/endroits/update-image/:id/imageId
  *@method Delete
  *@access private (only admin)
//  */

module.exports.deleteImgCtrl = asyncHandler(async (req, res) => {
  //params
  // const {idplace,idImg} = req.params
  //get place
  const place = await Place.findById(req.params.id);

  //find element  in pictures
  const element = await place.pictures.find(
    ({ publicId }) => publicId === req.params.imageId
  );

  //validation
  if (place.pictures.length <= 1) {
    return res.status(401).json({ message: "you can't delete the picture" });
  } else {
    await place.pictures.splice(element, 1);
  }
  if (place?.pictures == null) {
    return res.status(404).json({ message: "Pictures array not found" });
  }

  const updateImg = await Place.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        pictures: place?.pictures,
      },
    },
    { new: true }
  );

  return res.status(200).json(updateImg);
});

/**
 *@desc update endroit picture
 *@route api/endroits/update-image/:id/imageid
 *@method PUT
 *@access private (only admin)
 */
module.exports.updateImgCtrl = asyncHandler(async (req, res) => {
  //etape 1 : valiadtion for image
  if (!req.file) {
    return res.status(400).json({ message: "No Image Provided" });
  }
  //etape 2 : find place
  const place = await Place.findById(req.params.id);
  if (!place) {
    return res.status(400).json({ message: "place not found " });
  }

  // delete the old picture
   const element = await place.pictures.find(
     ({ publicId }) => publicId === req.params.imageId
   );
   await place.pictures.splice(element, 1);
  //etape 3 : upload photo
  const pathImage = path.join(__dirname, `../images/${req.file.filename}`);
  //etape 3 : upload to cloudinary
  const result = await cloudinaryUploadImage(pathImage);

  //etape 4 : add to pictures array
  place?.pictures.push({ url: result.secure_url, publicId: result.public_id });

  // etape 5 : update db
  const updateImg = await Place.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        pictures: place?.pictures,
      },
    },
    { new: true }
  );
  console.log(updateImg);
  //etape 6 : send response to the client
  res.status(201).json(updateImg);
  //etape 7 : remove image from server
  fs.unlinkSync(pathImage);
});
