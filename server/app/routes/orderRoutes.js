import express from 'express';
import { saveOrder,getOrders,getOrdersById } from '../controllers/orderContoller.js'
import { checkToken} from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/crearOrden',saveOrder)
router.get('/obtenerOrdenes', getOrders)
router.get('/obtenerOrdenes/:id', getOrdersById)
export default router;