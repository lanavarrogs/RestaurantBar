import express from "express";
import { getSucursal,crearSucursal  } from "../controllers/sucursalController.js";  

const router = express.Router();

router.get('/obtenerSucursal', getSucursal);
router.post('/crearSucursal', crearSucursal);

export default router