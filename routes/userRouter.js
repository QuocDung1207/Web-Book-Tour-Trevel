const express = require("express");
const userCotroller = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(userCotroller.getAllUsers).post(userCotroller.createUser);
router
  .route("/:id")
  .get(userCotroller.getUser)
  .patch(userCotroller.updateUser)
  .delete(userCotroller.deleteUser);
module.exports = router;
