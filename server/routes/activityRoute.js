const { createActivityCntrl, getAllActivityCntrl, getActivityCountCntrl, getSingleAcivityCntrl, deleteActivityCntrl, UpdateActivityCntrl, UpdateActivityImageCntrl,getSingleAcivity,getAcivityPlaces } = require("../controllers/activityCntrl")
const photoUpload=require("../middleware/photoUpload")
const router = require("express").Router()
const{ verifyToken }=require("../middleware/verifyToken")
const validateObjectid =require("../middleware/validateObjectid")


// /api/admin/activities
router.route("/").get(getAllActivityCntrl)
router.route("/:id").get(getSingleAcivity)
router.route("/places/:id").get(getAcivityPlaces)

router.route("/admin").post(verifyToken,photoUpload.single("image"),
createActivityCntrl)
 
// /api/admin/activities/count 
router.route("/admin/count").get(getActivityCountCntrl)

// /api/admin/acticities/:id
router.route("/admin/:id").get(validateObjectid,getSingleAcivityCntrl)
.delete(validateObjectid,verifyToken,deleteActivityCntrl)
.put(validateObjectid,verifyToken,UpdateActivityCntrl)


// /api/activites/update-image/:id
router.route("/admin/update-image/:id").put(validateObjectid,
    verifyToken,photoUpload.single("image"),UpdateActivityImageCntrl)


module.exports=router 