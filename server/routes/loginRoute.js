const router = require("express").Router()
const {admin_login, verifyAdminAccountCtrl}=require("../controllers/auth/admin/admin_login")
const {admin_signup}=require("../controllers/auth/admin/adminsignup")
// // /api/auth/register
// router.post("/register", resgisterAdminCntrl);
// /api/auth/login
router.post("/adminLogin", admin_login);
router.route("/admin_signup").post(admin_signup);


// /api /auth/:adminId/:token
router.get("/:adminId/verify/:token" , verifyAdminAccountCtrl)

module.exports=router;