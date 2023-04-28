import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";


const crearUsuario = async (req,res ) => {
  
  //Evitar registro de usuarios con el mismo username
  const { username } = req.body;
  const existeUsuario  = await Usuario.findOne({ username });

  if(existeUsuario){
    const error = new Error("El usuario ya existe");
    return res.status(400).json({msg: error.message});
  }

  try {
    const usuario = new Usuario(req.body)
    console.log(usuario)
    usuario.token = generarId();
    const usarioAlmacenado = await usuario.save();
    return res.status(200).json({msg: "Usuario creado correctamente"});

  } catch (error) {
    console.log(error);
  }

}

const listarUsuarios = async (req,res ) => {
  try {
    const usuarios = await Usuario.find({role:{ $ne: "admin" }});
    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
  }

}

const obtenerUsuario = async (req,res ) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id);
    return res.status(200).json(usuario);
  }catch(error){
    console.log(error);
  }
}

const editarUsuario = async (req,res ) => {
  const { id } = req.params;
  
  const usuario = await Usuario.findById(id);

  if(!usuario){
    const error = new Error("El usuario no existe");
    return res.status(400).json({msg: error.message});
  }

  usuario.username = req.body.nombreUsuario || usuario.username;
  usuario.nombre = req.body.nombre || usuario.nombre;
  usuario.role = req.body.tipoUsuario || usuario.role;
  usuario.password = req.body.password || usuario.password;
   
  try{
    const usarioAlmacenado = await usuario.save();
    res.json({msg: "Usuario actualizado correctamente"});
  }catch(error){
    console.log(error);
  }

}

const perfil = async (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
}

const eliminarUsuario = async (req,res ) => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndDelete(id);
    return res.status(200).json({msg: "Usuario eliminado correctamente"});
  }catch(error){
    console.log(error);
  }
}

export { crearUsuario, perfil,listarUsuarios,obtenerUsuario,editarUsuario, eliminarUsuario }