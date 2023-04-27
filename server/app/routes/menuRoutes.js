import express from 'express';
import { getProducts,obtenerProducto,agregarProducto,editarProducto }  from '../controllers/menuController.js'

const router = express.Router();


router.get('/products',getProducts)
router.get('/product/:id', obtenerProducto)
router.post('/agregarProducto', agregarProducto)
router.put('/editarProducto/:id', editarProducto)


export default router;