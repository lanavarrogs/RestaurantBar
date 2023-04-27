import express from 'express';
import { signin } from '../controllers/authController.js';

const router  = express.Router();

//Login de usuarios
router.post('/signin', signin);

export default router;