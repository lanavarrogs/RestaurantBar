import express from 'express';
import { crearUsuario, perfil } from '../controllers/usuarioController.js';
import { isAdmin, checkToken } from '../middleware/checkAuth.js';


const router = express.Router();

//Creacion, Registro y Confirmacion de Usuarios
router.post('/crearUsuario', isAdmin, crearUsuario);
router.post('/user',checkToken,perfil);


export default router;