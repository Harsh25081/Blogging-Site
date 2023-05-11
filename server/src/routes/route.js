const express = require("express")
const { createUser, login } = require("../Controllers/userController")
const { CreateBlog, getAllBlogs, getBlogByFilter, updateBlog, deleteBlog } = require("../Controllers/blogController")
const router = express.Router()

router.post("/createuser", createUser)
router.post("/login", login)
// router.get("/getallusers",getAllUsers)

router.post("/blogs/createblog", CreateBlog)
router.get("/blogs/getallblogs", getAllBlogs)
router.get("/blogs/getblogbyfilter", getBlogByFilter)
router.patch("/blogs/updateblog/:id", updateBlog)
router.delete("/blogs/deleteblog/:id", deleteBlog)

router.get("/test-me", function (req, res) { res.send("Hi this is the demo api!!!!") })

module.exports = router