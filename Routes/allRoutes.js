const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

const viewsController = require("../controller/viewController");

const videoController = require("../controller/videoController");

//API ROUTES
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post(
  "/upload-videos",
  userController.isLoggedin,
  videoController.uploadVideos,
  (req, res, next) => {
    res.redirect("/my-videos");
    next();
  },
  videoController.addMyvideos
);
router.get("/get-all-Videos/:videoName", videoController.getAllVideos);
router.get("/get-thumbnail/:Thumbnail", videoController.getvideoThumbnail);
router.get("/delete/:id", userController.protect, videoController.deleteVideo);

//viewRoutes
router.get("/", userController.isLoggedin, viewsController.getAllVideos);
router.get("/signup", viewsController.getSignUpForm);
router.get("/login", userController.isLoggedin, viewsController.getLoginForm);
router.get("/my-videos", userController.protect, viewsController.showMyVideos);
router.get(
  "/upload-file",
  userController.protect,
  viewsController.uploadVideos
);

module.exports = router;
