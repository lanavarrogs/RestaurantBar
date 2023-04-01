import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const isAdmin = async(req,res,next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select('-password -token');
      if(req.usuario.role !== 'admin'){
        const error = new Error('No tienes permisos para realizar esta accion');
        res.status(401).json({msg: error.message})
      }
    } catch (error) {
      console.log(error)
      return res.status(404).json({msg: 'Hubo un errror en el servidor'})
    }
  }
  if(!token){
    const error = new Error('Token  no valido');
    res.status(401).json({msg: error.message})
  }
  next();
}

const checkToken = async(req,res,next) => {
   
  let token = req.body.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    id = decoded.id
    const user = await Usuario.findById(id)
    req.user = user
    next();
  });


}

export { isAdmin,checkToken  };