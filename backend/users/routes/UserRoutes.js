const express = require("express");
const router = express.Router();
const validateToken = require("../Middleware/ValidateToken");
const {getUsers, getUserByID, createUser, updateUser, deleteUser,registerUser,loginUser,currentUser,UpdateCurrentUser} = require("../controllers/UserController");
//----------------------------------------------------------------------------
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//----------------------------------------------------------------------------
//get all users
router.route("/").get(getUsers);

//get user by id
router.route("/:id").get(getUserByID);

//create a user
router.route("/").post(createUser);

//update a user
router.route("/:id").put(updateUser);

//delete a user
router.route("/:id").delete(deleteUser);

//register a user
router.route("/register").post(upload.single('profilePic'), registerUser);

//login a user
router.route("/login").post(loginUser);  

//current user
router.route("/current/user").get(validateToken,currentUser);

//update current user from token
router.route("/update/current/user").post(validateToken,UpdateCurrentUser);


module.exports = router;