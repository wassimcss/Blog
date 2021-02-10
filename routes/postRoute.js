
const router = require("express").Router()
const postCtrl = require("../controllers/postCtrl")
const auth = require("../middleware/auth")

// get All posts
router.get("/all_posts",postCtrl.getAllPost)
//get followed post
router.get("/followed_posts",auth,postCtrl.getFollwowedPost)
//create post
router.post("/create_post",auth,postCtrl.createPost)
// get post user
router.get("/myposts",auth,postCtrl.getMyPost)
// make Like by user
router.put("/like",auth,postCtrl.like)
// make unlike
router.put("/unlike",auth,postCtrl.unlike)
// comment
router.put("/comment",auth,postCtrl.comments)
//delete post
router.delete("/delete_post/:postId",auth,postCtrl.deletePost)

module.exports = router