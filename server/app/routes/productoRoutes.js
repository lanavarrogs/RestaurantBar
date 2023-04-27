import express from "express"
import {getProductos} from "../controllers/productoController.js"

const router = express.Router()

router.get('/obtenerProductos', getProductos)


export default router