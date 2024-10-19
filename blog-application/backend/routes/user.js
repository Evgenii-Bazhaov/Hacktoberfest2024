const express = require("express")
const router = express.Router()

const {signUp, login, checkUsername} = require("../controllers/auth")
const {createPost, getAllPosts, getUserPosts, updateUserPost, deleteUserPost, getPostById, getUserPostsById} = 
require("../controllers/posts")
const {auth} = require("../middleware/auth")


router.post('/signup', signUp);
router.post('/login', login);
router.post('/create-post', auth, createPost)
router.get('/posts', getAllPosts)
router.get('/user-posts', auth, getUserPosts);
router.put('/update-post/:postId', auth, updateUserPost);
router.delete('/delete-post', deleteUserPost);
router.post('/check-username', checkUsername);
router.get('/postById/:id', getPostById);
router.get('/userPostsById/:id', getUserPostsById);

module.exports = router