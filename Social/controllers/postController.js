
import postModel from "../models/postModel";
import cloudinary from 'cloudinary'

//configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRECT
})

export const createPostController = async (req, res) => {
  //   console.log(req.body);
  const { content,image } = req.body;
  //validation
  if (!content.length) {
    return res.status(400).send("Content is Required");
  }
  try {
    const post = new postModel({ content, image, postedBy: req.user._id });
    post.save();
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error, Please Try Again!");
  }
};

export const imageUploadController = async(req, res)=>{

  try {
    const result = await cloudinary.uploader.upload(req.files.image.path)
    console.log("image dertails is ",result)
    res.json({
      url:result.secure_url,
      public_id:result.public_id
    })
    
  } catch (error) {
    console.log(error)
  }
}