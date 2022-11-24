import express from 'express'
import { registerController,loginController,updateProfileController,currentUserController,forgotPasswordController, findPeopleController} from '../controllers/authController';

import {requireSignIn} from '../middleware'
//route object
const router = express.Router();

//route 
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/currentUser", requireSignIn, currentUserController);
router.post("/forgot-password", forgotPasswordController);
router.put("/profile-update", requireSignIn, updateProfileController);
router.get("/find-people",requireSignIn, findPeopleController);

module.exports = router;