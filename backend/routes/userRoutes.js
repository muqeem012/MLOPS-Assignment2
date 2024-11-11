const express = require("express");
const router = express.Router();
const {registerUser,loginUser,validateUser, sendOTP, changePassword} = require("../controllers/userController");
const authenticate = require("../middlewares/Authentication");

//Making all the User's Routes/Apis here:

//Signup Api
router.post("/register", registerUser);

//login Api
router.post("/login", loginUser);

//userValidation Api
router.post("/validate",authenticate,validateUser);

//send OTP
router.post("/sendOTP", sendOTP);

// change password
router.put("/changepassword", changePassword);

module.exports = router;