import express from "express";
import { getUser, getUserInfo, updateUser  , uploadPic , deletePic , getAllUsers} from "../Controllers/users.js";

const router = express.Router();



router.get('/me/info/', getUserInfo);

router.get('/me', getUser);

router.put('/me', updateUser);

router.post('/uploadPic' , uploadPic);
router.delete('/deletePic' , deletePic);

//For Admin 
router.get('/getAllUsers', getAllUsers)
export default router;

