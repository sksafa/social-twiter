
import express from "express";
import { createPostController,imageUploadController, userPostsController,userPostEditController,updatePostController } from "../controllers/postController";
import { editDeletePost, requireSignIn } from "../middleware";
import expressFormidable from 'express-formidable';
//router object
const router = express.Router();

//routes
router.post("/createpost", requireSignIn, createPostController);
router.post("/upload-image", requireSignIn, expressFormidable({maxFieldsSize:5*1024*1024}), imageUploadController )
router.get("/user-post", requireSignIn, userPostsController);
router.get("/user-post/:_id", requireSignIn, userPostEditController);
router.put("/update-post/:_id", requireSignIn,editDeletePost, updatePostController);
module.exports = router;