const { signup, login, checkAuth, logout } = require('./Controllers/AuthController');
const { createBlog, getAllBlogs, getBlogById, getBlogsByKeyword, getBlogsByAuthor } = require('./Controllers/BlogController');
const { getComment, addComment, updateComment, deleteComment } = require('./Controllers/CommentController');
const verifyToken = require('./middleware/verifyToken');

const router = require('express').Router()

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth",verifyToken, checkAuth)
router.post("/createBlog",verifyToken, createBlog)
router.get("/allBlogs", getAllBlogs)
router.get("/getBlogById/:id", getBlogById)
router.get("/getBlogsByAuthor/:id", getBlogsByAuthor)

router.get("/getBlogsByKeyword/:keyword", getBlogsByKeyword)

router.get("/getComments/:id", getComment);
router.post("/addComment/:id",addComment)
router.put("/updateComment/:blogId/:commentId", updateComment);
router.delete("/deleteComment/:blogId/:commentId", deleteComment);

module.exports = router;