import User from '../Models/User.js';
import {uploadToCloudinary , removeFromCloudinary } from '../services/cloudinary.js';
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    res.status(200).json(user);
  } catch (err) {
    return res.error(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
      },
    ).select('name email');
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.error(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
 //   console.log("UserInfo API");
    const data = await User.findById(req.user.id)
      .select('firstname lastname email imageUrl');  
 //     console.log("UserInfoo Api data is " + data + "req.user.id is " + req.user.id)
    res.status(200).json({data});
  } catch (err) {
    return res.send(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('firstname lastname email imageUrl');
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

// UploadToCloudinaryFolder

export const uploadPic = async (req, res , next) =>{
  try{

  console.log(" uploadPic API is calling now", req.file);
  //Upload image to cloudinary
  console.log("req.file.path is " + req.file.path)
const data = await uploadToCloudinary(req.file.path , "UploadToCloudinaryFolder");
console.log("data while uploading " + data);
// save image url and publ icId in the database
const updatedUser = await User.updateOne(   
  { _id : req.user.id},
  {
    $set:{
      imageUrl:data.url ,
    publicId : data.public_id
    }
  },
);
console.log("updated user is " + updatedUser);
return res.status(200).send("User Image uploaded successfuly");
}catch(err){
  return res.status(400).send("There is an error while Uploading Image in API  " + err)
}
}


export const deletePic = async (req, res , next) =>{
try{
  console.log("Delete API is Calling");hhhhhh
  console.log("req.user.id is " + req.user.id);

const newuser =await User.findOne({
  _id : req.user.id
});

const publicId = newuser.publicId; 
await removeFromCloudinary(publicId);

 await User.updateOne(
  {_id : req.user.id}
  ,
  {
    $set : {
      imageUrl : "" ,
      publicId : ""
    }
  }

);
res.status(200).send("Image deleted successfully ");
}catch(err){
  return res.status(400).json("There is an error while Removing file from Cloudinary in the  " + err)

}

}

