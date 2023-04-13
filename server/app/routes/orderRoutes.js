import express from 'express';
import { saveOrder } from '../controllers/orderContoller.js'

const router = express.Router();

router.post('/crearOrden',saveOrder)


export default router;