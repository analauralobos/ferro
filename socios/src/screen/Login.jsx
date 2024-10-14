import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

// URL de la API
const URL = 'http://localhost:8080/administrador';

// Hook personalizado para consumir la API
function useFetch(URL) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Error al obtener datos');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    return { data, loading, error };
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const resul = useFetch(URL);  // Usamos el hook para obtener los datos
    const navigate = useNavigate();

    const handleLogin = () => {
        // Verificamos si los datos de la respuesta están disponibles
        if (resul.data && Array.isArray(resul.data.data)) {
            const usuarios = resul.data.data;
    
            // Buscamos el usuario que coincida con el email y la contraseña
            const usuarioEncontrado = usuarios.find(
                (usuario) => usuario.Usuario === email && usuario.Contraseña === password
            );
    
            // Si se encuentra un usuario que coincide con las credenciales
            if (usuarioEncontrado) {
                navigate("/home");  // Redirigimos al usuario a la página principal
            } else {
                alert('USUARIO O CONTRASEÑA INCORRECTOS');  // Si no hay coincidencias
            }
        } else {
            alert('Cargando datos, por favor espera');  // Si los datos aún no están disponibles
        }
    };
    

    return (
        <Container>
            <div className="fondo">
                <div className="right">
                    <div className="texto_login">
                        Club Social y Atletico Ferro Carril Oeste
                    </div>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className="formulario">
                    <div className="form flex column a-center j-center">
                        <div className="container flex column">
                            <div className="texto_form">Usuario</div>
                            <input
                                className="input_login"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <div className="texto_form">Contraseña</div>
                            <input
                                className="input_login"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div>
                                <button onClick={handleLogin} className="boton">Ingresar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Container= styled.div`
overflow: hidden;

.fondo{
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 215, 0, 1);
    border: solid;
}
.texto_login{
    color: white;
    font-size:30px;
    font-weight:bold;
    line-height:64px;
    text-transform:capitalize;
    text-align:center;
    text-indent:10px;
    padding-top:50px;
    padding-left:20px;
    width:50%; 
    
    position: absolute;
    margin-top:5%;
}
.logo{
    width:50%; 
    text-align:center;
    margin-top: 50px;
    position: absolute;
    top:30%;
    
}
.formulario{
   
    width:50%; 
    margin-left:50%;
    margin-top:10%;
}
    
.texto_form{
    color: white;
    font-size:20px;
    font-weight:bold;
    line-height:32px;
    text-transform:capitalize;
    text-align:left;
    text-indent:10px;
    /*padding-left:50%;*/
    margin-top: 10px;
    
}
.input_login{
    border-radius: 10px;
    border: 0;
    /*margin-left:50%;*/
    height: 5vh;
    width: 50%;
    margin-top: 10px;
    box-shadow: 1px 2px rgba(0,0,0,0.2);
}
.boton{
    background-color: rgba(0, 84, 0, 1);
    margin-top: 35px;
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    color: white;
    border: 0;
    box-shadow: 1px 2px rgba(0,0,0,0.5);
}
`
