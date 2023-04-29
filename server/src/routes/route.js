const express = require("express")
const { createUser, login } = require("../../Controllers/userController")
const { CreatePost, getAllPosts, getpostById, updatePost, deletePost } = require("../../Controllers/postController")
const router = express.Router()

router.post("/createuser",createUser)
router.post("/login",login)
// router.get("/getallusers",getAllUsers)

router.post("/posts/createpost",CreatePost)
router.get("/posts/getallposts",getAllPosts)
router.get("/posts/getpostbyid/:id",getpostById)
router.patch("/posts/updatepost/:id",updatePost)
router.delete("/posts/deletepost/:id",deletePost)

router.get("/test-me",function (req,res){res.send("Hi this is the demo api!!!!")})

module.exports = router