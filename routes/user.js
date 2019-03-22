const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user");
const checkAuth = require('../middleware/check-auth');


// post method to creat new user 
router.post('/signup', UserController.User_SignUp);
//post method to login
router.post("/login", UserController.User_Login);
//delete method to delete exist user
router.delete("/setting/:userId", checkAuth, UserController.User_Deleting);
//put method to update exist user password
router.put('/profile/setting/changepassword/:userId', checkAuth, UserController.User_Updating_password);
//put method to update exist user name
router.put('/profile/setting/changename/:userId', checkAuth, UserController.User_Updating_name);
//get method to go profile
router.get("/:userId", checkAuth, UserController.User_profile);
// post method about follow
router.post("/:auserId/:buserId/follow", checkAuth, UserController.User_follow);
// get method about unfollow 
router.get("/:auserId/:buserId/unfollow", checkAuth, UserController.User_unfollow);
// post method about simple search 
router.post("/search", checkAuth,UserController.Search);

module.exports = router