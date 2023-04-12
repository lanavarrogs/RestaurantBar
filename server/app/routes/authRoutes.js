import express from 'express';
import { signin } from '../controllers/authController.js';

const router  = express.Router();

//Login de usuarios
router.post('/signin', signin);
router.post('/singout')

export default router;