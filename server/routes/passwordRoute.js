const router = require("express").Router();
const {sendRessetPwdlinkCntrl, getRessetPwdLinkCntrl, ressetPwdCntrl} =require ("../controllers/auth/admin/passwordController")


//  /api/password/reset-password-link
router.post("/reset-password-link" , sendRessetPwdlinkCntrl);

//  /api/password/reset-password-link/:adminId/:token
router.route("/reset-password-link/:adminId/:token")
 .get(getRessetPwdLinkCntrl)
 .post(ressetPwdCntrl);


module.exports = router;