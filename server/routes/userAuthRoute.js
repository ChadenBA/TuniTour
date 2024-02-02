const router = require("express").Router()
const {userSignInCtrl}= require("../controllers/auth/user/UserSignInCtrl")
const {userSignUpCtrl}= require("../controllers/auth/user/UserSignUpCtrl")
const {userForgetPassword} = require('../controllers/auth/user/ForgetPassword')
const {userResetPassword} =require("../controllers/auth/user/RessetPassword")






router.post("/signin",userSignInCtrl)
router.post("/signup",userSignUpCtrl)
router.post("/forgetpassword",userForgetPassword)

router.put("/resetpassword/:id/:token",userResetPassword)
module.exports = router