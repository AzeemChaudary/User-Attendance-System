import express from "express";
import { getUser, getUserInfo, updateUser  , uploadPic , deletePic , getAllUsers} from "../Controllers/users.js";
import upload from '../middleware/upload.js';

const router = express.Router();



router.get('/me/info/', getUserInfo);

router.get('/me', getUser);

router.put('/me', updateUser);

router.post('/uploadPic' , upload.single("userImage") , uploadPic);
router.delete('/deletePic' , deletePic);

//For Admin 
router.get('/getAllUsers', getAllUsers)
export default router;

