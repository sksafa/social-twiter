import userModel from "../models/userModel"
import { hashPassword, comparePassword } from "../utiles/helper"
import jwt from 'jsonwebtoken'
import { nanoid } from "nanoid";

//registration controller
export const registerController = async (req, res) => {
    const { name, email, password, answer } = req.body
    if (!name) {
        return res.status(400).send("Name is required")
    }
    if (!password) {
        return res.status(400).send("password is required")
    }
    if (!answer) {
        return res.status(400).send("Answer is required")
    }

    const exist = await userModel.findOne({ email })
    if (exist) {
        return res.status(400).send("Email Already Taken")
    }

    //hash password
    const hashedPassword = await hashPassword(password)
    const user = new userModel({
        name,
        email,
        password: hashedPassword,
        answer,
        username: nanoid(6),
      });
    try {
        await user.save()
        res.status(200).send('User Registered Successfully')
    } catch (error) {
        console.log("error while registration", error)
        return res.status(400).send('Error , Try again')
    }
}


//loginController controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).send('User Invalid')
        const match = await comparePassword(password, user.password)
        if (!match) return res.status(400).send('Password Invalid')
        //token
        const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        user.password = undefined
        user.answer = undefined
        res.status(200).json({
            token,
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error , Try again')
    }
}


//currentUserController controller
export const currentUserController = async (req, res) => {
    console.log(req.user);
    try {
        const user = await userModel.findById(req.user._id).populate("following", " _id, name");
        res.status(200).json({ok:true});
        // res.json(user)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }

}
//test
export const getSingleUserController = async (req, res) => {
  try {
      const user = await userModel.findById(req.params.id).populate("following", " _id, name");
      res.status(200).json(user);
      // res.json(user)
  } catch (error) {
      res.status(400).send(error)
      console.log(error)
  }

}

//forgot password
export const forgotPasswordController = async (req, res) => {
    const { email, answer, newPassword } = req.body;
    //validation
    if (!email) {
      res.status(400).send("Email Is Requires");
    }
    if (!newPassword) {
      res.status(400).send("New Password Required");
    }
    if (!answer) {
      res.status(400).send("Answer is Required");
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(404).send("Wrong Email Or Answer,PLease Try Again");
    }
    try {
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      return res.status(201).send("Password Reset success");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something Went Wrong");
    }
  };


// update profile
export const updateProfileController = async (req, res) => {
    // console.log(req.body);
    try {
      const data = {};
      if (req.body.username) {
        data.username = req.body.username;
      }
      if (req.body.image) {
        data.image = req.body.image;
      }
      if (req.body.about) {
        data.about = req.body.about;
      }
      if (req.body.name) {
        data.name = req.body.name;
      }
      if (req.body.password) {
        if (req.body.password < 6) {
          return res.status(502).json({
            error: "Password Required and should be longer than 6 character",
          });
        } else {
          data.password = await hashPassword(req.body.password);
        }
      }
      if (req.body.answer) {
        data.answer = req.body.answer;
      }
      let user = await userModel.findByIdAndUpdate(req.user._id, data, {
        new: true,
      });
      user.password = null;
      user.answer = null;
      res.status(200).json(user);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          error: "Duplicate UserName Error",
        });
      }
      console.log(err);
    }
  };

//find people controller 
   export const findPeopleController = async(req, res)=>{
    try {
      const user = await userModel.findById(req.user._id)
      // following user
      let following  = user.following
      following.push(user._id);
      const people = await userModel.find({ _id: { $nin: following}}).select("-password -answer").limit(100)
      // const people = await userModel.find().select("-password -answer").limit(10)
      res.json(people)
    } catch (error) {
      console.log(error)
    }
   }

   // follower 
  export const followUser = async (req, res) =>{
    console.log("cuser",req.body.userId)
    console.log("user", req.params.id)

    if (req.body.userId !== req.params.id) {
      try {
        const user = await userModel.findById(req.params.id);
        const currentUser = await userModel.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { following: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }  else {
      res.status(403).json("you cant follow yourself");
    }
  }
 
// unFollowing
export const unFollowUser =async (req, res) =>{
  console.log("cuser",req.body.userId)
  console.log("user", req.params.id)
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      const currentUser = await userModel.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been un followed");
      } else {
        res.status(403).json("you allready unfollow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }  else {
    res.status(403).json("you cant unfollow yourself");
  }
}
 
