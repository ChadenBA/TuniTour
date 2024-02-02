const { getAdminCntrl, getAdminProfileCntrl, updateAdminProfileCtrl, getUserCountCntrl, getProfilePicUploadCntrl } = require("../controllers/adminController");
const { verifyToken, verifyTokenAdmin, verifyTokenAndOnlyAdmin} = require("../middleware/verifyToken");
const validateObojectId=require("../middleware/validateObjectid")
const photoUpload=require("../middleware/photoUpload");
const { sendCode, validetCode, changePassword } = require("../controllers/auth/admin/security");
const router = require("express").Router()

//api/admin/adminProfile"
router.route("/adminProfile").get(verifyTokenAdmin,getAdminCntrl);

// //api/admin/count"
// router.route("/count").get(verifyTokenAdmin,getUserCountCntrl);

//api/admin/adminProfile/is"
router.route("/adminProfile/:id")
.get(validateObojectId,getAdminProfileCntrl)
.put(validateObojectId,verifyTokenAndOnlyAdmin,updateAdminProfileCtrl);


//api/admin/adminProfile/profile-photo-upload"
router.route("/adminProfile/profile-photo-upload")
  .post(verifyTokenAdmin,photoUpload.single("image"),getProfilePicUploadCntrl);

//SECURITY MANAGMNET 
router.route("/profile/:id/security/email").post(validateObojectId,verifyToken,sendCode)
router.route("/profile/:id/security/valide-email").put(validateObojectId,verifyToken,validetCode)
router.route("/profile/:id/security/password").put(validateObojectId,verifyToken,changePassword)

module.exports=router;