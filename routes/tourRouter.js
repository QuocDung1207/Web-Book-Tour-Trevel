const express = require("express");
const tourCotroller = require("../controller/tourController");

const router = express.Router();

// router.param("id", tourCotroller.checkID);

router
  .route("/top-5-cheap")
  .get(tourCotroller.aliasTopTours, tourCotroller.getAlltours);

//Create a checkBody middleware
//Check if body contains the name and price properties
//If not , send back 400(bad request)
//Add it to the post handler stack

router
  .route("/")
  .get(tourCotroller.getAlltours)
  .post(tourCotroller.CreateTours);

router
  .route("/:id")
  .get(tourCotroller.getTours)
  .patch(tourCotroller.updateTours)
  .delete(tourCotroller.deleteTours);

module.exports = router;
