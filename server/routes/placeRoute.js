const { createEndroitCntrl, getAllEndroitCntrl, getSingleEndroitCntrl, getEndroitCountCntrl, deleteEndroitCntrl, UpdateEndroitCntrl, updateImgCtrl, deleteImgCtrl } = require("../controllers/placeCntrl")
const {getPlaces,getByActivity,getByCategory,getByCity,getSinglePlace,toggleLikeCtrl} = require("../controllers/placeCntrl")

const photoUpload=require("../middleware/photoUpload")
const router = require("express").Router()
const{ verifyToken }=require("../middleware/verifyToken")
const validateObjectid =require("../middleware/validateObjectid")


// /api/endroits
router.route("/").get(getPlaces)

 //get single place
router.route("/:id").get(getSinglePlace)
//get by cities
router.route("/city/:id").get(getByCity)
//get by activitiesp
router.route("/activities/:id").get(getByActivity)
//likes
router.route("/likes/:id").put(validateObjectid,verifyToken,toggleLikeCtrl)





router.route("/admin").post(verifyToken,photoUpload.array("image"),
createEndroitCntrl)
// /api/endroits/count 
router.route("/admin/count").get(getEndroitCountCntrl)

// /api/endroits/:id
router.route("/admin/:id").get(validateObjectid,getSingleEndroitCntrl)
.delete(validateObjectid,verifyToken,deleteEndroitCntrl)
.put(validateObjectid,verifyToken,UpdateEndroitCntrl)


// /api/endroits/update-image/:id
router.route("/admin/update-image/:id/:imageId").put(validateObjectid,
    verifyToken,photoUpload.single("image"),updateImgCtrl).
    delete(validateObjectid,verifyToken,deleteImgCtrl)
module.exports=router 