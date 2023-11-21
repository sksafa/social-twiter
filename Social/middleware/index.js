
import expressJwt from "express-jwt";
import postModel from "../models/postModel";

// require sign in
export const requireSignIn = expressJwt({
  secret:process.env.JWT_SECRET,
  algorithms: ["HS256"],
});



// editDeletePost
export const editDeletePost = async (req, res, next)=>{
  try {
    const post = await postModel.findById(req.params._id);
    if(req.user._id != post.postedBy){
      return res.status(402).send('unAuthorized Access');
    }else{
      next()
    }
  } catch (error) {
    console.log(error)
  }
}