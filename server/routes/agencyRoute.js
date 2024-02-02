const { createAgencyCntrl, getAllAgenciesCntrl, getSingleAgencyCntrl, deleteAgencyCntrl, UpdateAgenciesCntrl, UpdateAgencyImageCntrl } = require("../controllers/agencyContrl")
const photoUpload=require("../middleware/photoUpload")
const router = require("express").Router();
const{ verifyToken }=require("../middleware/verifyToken")
const validateObjectid =require("../middleware/validateObjectid");
const { UpdateCityImageCntrl } = require("../controllers/cityCntrl");


// /api/admin/
router.route("/").get(getAllAgenciesCntrl)

router.route("/admin").post(verifyToken,photoUpload.single("image"),
createAgencyCntrl)
 
// /api/admin/cities/count 
//router.route("/count").get(ge)

// /api/admin/cities/:id
router.route("/admin/:id").get(validateObjectid,getSingleAgencyCntrl)
.delete(validateObjectid,verifyToken,deleteAgencyCntrl)
.put(validateObjectid,verifyToken,UpdateAgenciesCntrl)


// /api/admin/endroits/update-image/:id
router.route("/admin/update-image/:id").put(validateObjectid,
    verifyToken,photoUpload.single("image"),UpdateAgencyImageCntrl)

module.exports=router;



