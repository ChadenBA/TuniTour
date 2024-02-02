const router = require("express").Router();

const { createCtegoryCntrl, getallCtegoryCntrl, deleteCtegoryCntrl, UpdateCategoryCntrl } = require("../controllers/categoriesCntrl");
const {verifyTokenAdmin, verifyToken}=require("../middleware/verifyToken")

const validateObjectid = require("../middleware/validateObjectid");


// /api/admin/categories
router.route("/").get(getallCtegoryCntrl);

router.route("/admin").post(verifyTokenAdmin,createCtegoryCntrl)

// /api/admin/categories/:id
router.route("/admin/:id").delete(validateObjectid , verifyTokenAdmin , deleteCtegoryCntrl)
.put(validateObjectid,verifyToken,UpdateCategoryCntrl)
module.exports=router;
 