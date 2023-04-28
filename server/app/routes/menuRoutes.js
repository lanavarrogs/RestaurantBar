import express from 'express';
import { getProducts,obtenerProducto,agregarProducto,editarProducto, eliminarProducto }  from '../controllers/menuController.js'

const router = express.Router();


router.get('/products',getProducts)
router.get('/product/:id', obtenerProducto)
router.post('/agregarProducto', agregarProducto)
router.put('/editarProducto/:id', editarProducto)
router.delete('/eliminarProducto/:id' , eliminarProducto)


export default router;