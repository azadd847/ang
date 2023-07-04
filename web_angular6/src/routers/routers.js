const express = require("express");

const router =express.Router();

router.route("/user/create").post(userController.createUserControllerFn);



module.exports =router;