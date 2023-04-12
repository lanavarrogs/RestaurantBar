import express from 'express';
import connectDB from './app/config/db.js';
import { PORT } from './config.js';
import cors from 'cors'


import usuarioRoutes from './app/routes/usuarioRoutes.js';
import authRoutes from './app/routes/authRoutes.js'
import menuRoutes from './app/routes/menuRoutes.js'

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
};

//validar los Cors
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

connectDB();

//Routing
app.use("/api/auth",authRoutes);
app.use("/api/usuarios",usuarioRoutes);
app.use("/api/menu",menuRoutes);


app.listen(PORT,() =>{
    console.log('Listening on port 3000');
})