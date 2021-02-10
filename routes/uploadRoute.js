const router = require("express").Router()
const auth = require("../middleware/auth")
const uploadImage = require("../middleware/uploadImage")
const uploadCtrl = require("../controllers/uploadCtrl")

router.post("/upload_avatar",auth,uploadImage,uploadCtrl.uploadAvatar)

module.exports = router