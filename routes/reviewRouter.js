const express = require("express");
const reviewController = require("../controller/reviewController");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true });
//POST /tour/123423/reviews
//GET /tour/123423/reviews
//POST/reviews

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );

router.route("/:id").delete(reviewController.deleteReview);
module.exports = router;