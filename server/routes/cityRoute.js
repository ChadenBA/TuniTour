const { createCityCntrl, getAllCitiesCntrl, getCityCountCntrl, getSingleCityCntrl, deleteCityCntrl, UpdateCityCntrl, UpdateCityImageCntrl, deleteImgCtrl } = require("../controllers/cityCntrl")
const photoUpload=require("../middleware/photoUpload")
const router = require("express").Router();
const{ verifyToken }=require("../middleware/verifyToken")
const validateObjectid =require("../middleware/validateObjectid")


// /api/admin/cities
router.route("/").get(getAllCitiesCntrl)
//get single city

router.route("/:id").get(getSingleCityCntrl)


router.route("/admin").post(verifyToken,photoUpload.array("image"),createCityCntrl)

// /api/admin/cities/count 
router.route("/admin/count").get(getCityCountCntrl)

// /api/admin/cities/:id
router.route("/admin/:id").get(validateObjectid,getSingleCityCntrl)
.delete(validateObjectid,verifyToken,deleteCityCntrl)
.put(validateObjectid,verifyToken,UpdateCityCntrl)


// /api/admin/endroits/update-image/:id
router.route("/admin/update-image/:id/:imageId").put(validateObjectid,
    verifyToken,photoUpload.single("image"),UpdateCityImageCntrl).
    delete(validateObjectid,verifyToken,deleteImgCtrl)
   

module.exports=router;