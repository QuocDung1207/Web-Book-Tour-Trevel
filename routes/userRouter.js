const express = require("express");
const userCotroller = require("../controller/userController");
const authController = require("../controller/authController");
const reviewController = require("../controller/reviewController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/updateMe", authController.protect, userCotroller.updateMe);
router.delete("/deleteMe", authController.protect, userCotroller.deleteMe);

router.route("/").get(userCotroller.getAllUsers).post(userCotroller.createUser);
router
  .route("/:id")
  .get(userCotroller.getUser)
  .patch(userCotroller.updateUser)
  .delete(userCotroller.deleteUser);

//POST /tour/123423/reviews
//GET /tour/123423/reviews
//GET /tour/123423/reviews/56854

router
  .route("/:tourId/reviews")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );

module.exports = router;
