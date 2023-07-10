import express from 'express';
import auth from './auth.js';
import userRoutes from './users.js';
import checkAuth from '../middleware/checkAuth.js';
import attendenceRoutes from './attendence.js'

const router=express.Router();

router.use('/auth',auth);
router.use('/users' , checkAuth , userRoutes);
router.use('/attendence', checkAuth, attendenceRoutes);

export default router;
