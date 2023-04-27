import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const signin = async (req, res) => {
  try{
      const {username , password, _id } = req.body;
      //Comprobar si el usuario existe
      const usuario = await Usuario.findOne({username: username, sucursal:_id } )
      console.log(usuario)
      
      if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
      }

      //Comprobar su password
      if(!await usuario.matchPassword(password)){
        const error = new Error("El password es incorrecto");
        return res.status(404).json({msg: error.message});
      }

      //Generar el JWT
      let token = generarJWT(usuario._id);

      //Devolver el token
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: token
      });
    }catch(error){
      console.log(error);
      res.status(500).json({msg: "Hubo un error"});
    }
}


export { signin }
