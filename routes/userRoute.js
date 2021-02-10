const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/authRole");
const router = express.Router()

router.post("/register",userCtrl.register)
router.post("/activation",userCtrl.activateEmail)
router.post("/login",async (req,res)=> {
    await userCtrl.login(req,res,"User")})
router.post("/login/admin",async (req,res)=> {
    await userCtrl.login(req,res,"Admin")})
router.post("/refresh_token",userCtrl.getAccessToken)
router.post("/forgot",userCtrl.forgotPassword)
router.post("/reset",auth,userCtrl.resetPassword)

router.put("/profile",auth,userCtrl.updateProfile)

router.get("/info",auth,userCtrl.getUserInfo)
router.get("/all_info",auth,checkRole(["Admin"]),userCtrl.getAllUserInfo)
router.get("/logout",userCtrl.logout)
router.get("/:id",userCtrl.getUser)

// follow
router.put("/follow",auth,userCtrl.follow)
// unfollow
router.put("/unfollow",auth,userCtrl.unfollow)

module.exports = router