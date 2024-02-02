const router = require("express").Router()

const {getProfileClient,getAllProfileUsers,updateProfileUser,deleteProfileUser,updateProfileUserPhoto,deleteProfileUserPhoto,getBucketList,getAlreadyVistited,addToBucketList,deleteFromBucketList,deleteAlreadyVistitedList,addToAlreadyVistitedList}= require('../controllers/userCntrl')
const {sendCode,validetCode,changePassword} = require('../controllers/auth/user/security')

const photoUpload = require("../middleware/photoUpload")

const validateObjectId = require("../middleware/validateObjectid")

const { verifyTokenOnlyUser,verifyToken} = require("../middleware/verifyToken")



//get all users
router.get("/",getAllProfileUsers)
//profile management of one user(get/put/delete)
router.route("/profile/:id")
      .get(validateObjectId,getProfileClient)
      .put(validateObjectId,verifyTokenOnlyUser,updateProfileUser);

//update profile photo
router.route("/profile/profile-photo").post(verifyToken,photoUpload.single("image"),updateProfileUserPhoto)
router.route("/profile/profile-photo/delete").put(verifyToken,deleteProfileUserPhoto)

//BUCKET LIST MANAGEMNT 
router.route("/profile/:id/bucket-list").get(validateObjectId,verifyToken,getBucketList)
router.route("/profile/:id/bucket-list/add").put(validateObjectId,verifyToken,addToBucketList)
router.route("/profile/:id/bucket-list/delete").put(validateObjectId,verifyToken,deleteFromBucketList)

//VISITEDlIST Managemnt 
router.route("/profile/:id/visited-list").get(validateObjectId,getAlreadyVistited)
router.route("/profile/:id/visited-list/add").put(validateObjectId,verifyToken,addToAlreadyVistitedList)
router.route("/profile/:id/visited-list/delete").put(validateObjectId,verifyToken,deleteAlreadyVistitedList)

//SECURITY MANAGMNET 
router.route("/profile/:id/security/email").post(validateObjectId,verifyToken,sendCode)
router.route("/profile/:id/security/valide-email").put(validateObjectId,verifyToken,validetCode)
router.route("/profile/:id/security/password").put(validateObjectId,verifyToken,changePassword)

router.route("/profile/delete/:id").delete(validateObjectId,verifyToken,deleteProfileUser)


module.exports = router