import express from 'express'
import { login,verify } from '../controllers/authController.js'
import  authmiddleware from '../middlewares/authMiddleware.js'


const router = express.Router();

router.post('/login',login);
router.post('/verify',authmiddleware,verify);

export default router;