import { useState, createContext, useEffect } from "react";
import axios
 from "axios";
const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        const obtenerUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get('http://localhost:3000/api/usuarios/listarUsuarios',config);
                setUsuarios(data)

            } catch (error) {
                console.log(error);
            }
        }
        obtenerUsuarios();
    }, []);
    

    const nuevoUsuario = async usuario => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post('http://localhost:3000/api/usuarios/crearUsuario',usuario,config);
            
          

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerUsuario = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.get(`http://localhost:3000/api/usuarios/obtenerUsuario/${id}`,config);
            setUsuario(data)

        }catch (error){
            console.log(error);
        }
    }

    return(
        <UsuarioContext.Provider value={{
            usuarios,
            usuario,
            nuevoUsuario,
            obtenerUsuario,
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export{
    UsuarioProvider
}

export default UsuarioContext