
import express from "express";
import { createPostController,imageUploadController } from "../controllers/postController";
import { requireSignIn } from "../middleware";
import expressFormidable from 'express-formidable';
//router object
const router = express.Router();

//routes
router.post("/createpost", requireSignIn, createPostController);
router.post("/upload-image", requireSignIn, expressFormidable({maxFieldsSize:5*1024*1024}), imageUploadController )
module.exports = router;