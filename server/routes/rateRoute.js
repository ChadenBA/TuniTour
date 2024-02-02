const router = require("express").Router()
const {creationRateCntrl,getAllRates,countRates,moyenneRatePlace,getUserRates,getUserPlaceRates} = require("../controllers/Evaluation/ratePlaceCntrl")
const {createRateActivity,getAllRatesActivity,updateDeleteRateActivityCTRL,moyenneRatingActivityByPlaceTab,moyenneRatingActivityByPlace,mangementRateActivityCntrl} = require("../controllers/Evaluation/rateActivityCntrl")
const {verifyToken}= require("../middleware/verifyToken")
const validateObjectId=require('../middleware/validateObjectid')



//get all rates for places
router.route("/").get(getAllRates);
//get all rates for places for one user
router.route("/user/:id").get(verifyToken,getUserRates);
//get all rates for places for one user
router.route("/user/:id/:placeId").get(verifyToken,getUserPlaceRates);
//count rate for places
router.route("/:id/count").get(moyenneRatePlace);
//count rate for places
router.route("/count").get(countRates);
//create new rate for place
router.route("/rate-managment").post(verifyToken,creationRateCntrl);


/*************************************************************************************************************************************************************** */
//create new rate activity
router.route("/place/mangement-rate-activity").post(verifyToken,mangementRateActivityCntrl);
//get all rates for activity
router.route("/place/").get(getAllRatesActivity);
// //get moyenne for activity and place
router.route("/place/:placeId/:activityId").get(moyenneRatingActivityByPlace);
//get  moyenne for activity
router.route("/:activityId").get(moyenneRatingActivityByPlaceTab);
        





module.exports = router