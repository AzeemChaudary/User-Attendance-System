import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new  Error("Email is invalid")
        }
    }
  },
  password: {
    type: String,
    required: true,
  },
  publicId : {
type : String ,
required : false

  },
  imageUrl : {
type : String,
default : "https://res.cloudinary.com/dnmah35kz/image/upload/v1686565342/UploadToCloudinaryFolder/pdplxsojojwoq7mukbtl.png"
  } ,
  role : {
    type: String,
    default : "User"
  }
});
export default mongoose.model('User', userSchema);
