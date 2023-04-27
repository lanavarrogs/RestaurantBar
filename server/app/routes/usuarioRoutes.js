import express from 'express';
import { crearUsuario, perfil, listarUsuarios, obtenerUsuario, editarUsuario } from '../controllers/usuarioController.js';
import { checkToken } from '../middleware/checkAuth.js';


const router = express.Router();

//Creacion, Registro y Confirmacion de Usuarios
router.post('/crearUsuario', crearUsuario);
router.post('/user',checkToken,perfil);
router.get('/listarUsuarios',checkToken,listarUsuarios)
router.get('/obtenerUsuario/:id',obtenerUsuario);
router.put('/editarUsuario/:id',editarUsuario);

export default router;