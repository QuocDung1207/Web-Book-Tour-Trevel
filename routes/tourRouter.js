const express = require("express");
const tourCotroller = require("../controller/tourController");
const authController = require("../controller/authController");

const router = express.Router();

// router.param("id", tourCotroller.checkID);

router
  .route("/top-5-cheap")
  .get(tourCotroller.aliasTopTours, tourCotroller.getAlltours);

router.route("/tour-stats").get(tourCotroller.getTourStats);
router.route("/monthly-plan/:year").get(tourCotroller.getMonthlyPlan);
//Create a checkBody middleware
//Check if body contains the name and price properties
//If not , send back 400(bad request)
//Add it to the post handler stack

router
  .route("/")
  .get(authController.protect, tourCotroller.getAlltours)
  .post(tourCotroller.CreateTours);

router
  .route("/:id")
  .get(tourCotroller.getTours)
  .patch(tourCotroller.updateTours)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourCotroller.deleteTours
  );

module.exports = router;
