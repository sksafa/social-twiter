import express from 'express'
import { registerController,loginController,currentUserController,forgotPasswordController} from '../controllers/authController';

import {requireSignIn} from '../middleware'
//route object
const router = express.Router();

//route 
router.post("/register", registerController)
router.post("/login", loginController)
router.get("/currentUser", requireSignIn, currentUserController);
router.post("/forgot-password", forgotPasswordController);


module.exports = router;