import express from 'express'
import { registerController,loginController} from '../controllers/authController';
//route object
const router = express.Router();

//route 

//register
router.post("/register", registerController)
router.post("/login", loginController)


module.exports = router;