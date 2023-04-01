import express from 'express';
import { signin,logout } from '../controllers/authController.js';

const router  = express.Router();

//Login de usuarios
router.post('/signin', signin);
router.post('/logout', logout);

export default router;