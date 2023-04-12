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
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usarioAlmacenado = await usuario.save();
    res.json({msg: "Usuario creado correctamente", usarioAlmacenado: usarioAlmacenado});
  } catch (error) {
    console.log(error);
  }

}

const perfil = async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
}

export { crearUsuario, perfil }