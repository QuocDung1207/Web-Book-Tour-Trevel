const express = require("express");
const userCotroller = require("../controller/userController");

const router = express.Router();

router.route("/").get(userCotroller.getAllUsers).post(userCotroller.createUser);

router
  .route("/:id")
  .get(userCotroller.getUser)
  .patch(userCotroller.updateUser)
  .delete(userCotroller.deleteUser);
module.exports = router;
