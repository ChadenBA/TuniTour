const router = require("express").Router()

const {creactionCommentCTRL,getAllComments,deleteComment,updateCommentCntrl} = require("../controllers/Evaluation/commentCntrl")

const{ verifyToken }=require("../middleware/verifyToken")
const validateObjectid =require("../middleware/validateObjectid")
//get all comments
router.route("/").get(getAllComments)


//create new comment
router.route("/add-comment").post(verifyToken,creactionCommentCTRL)

//delete comment
router.route("/:id")
    .delete(validateObjectid,verifyToken,deleteComment)
    .put(validateObjectid,verifyToken,updateCommentCntrl)


module.exports = router