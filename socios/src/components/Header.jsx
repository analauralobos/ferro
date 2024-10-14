import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { BsPersonCircle } from "react-icons/bs";

export default function Header(props){
    const navigate = useNavigate();
    return (
        <Container className="flex a-center j-between">
            <div className="header">
                <div className="header_logo">
                    <img src={logo} alt="Logo" onClick={()=>navigate("/home" )}/>
                </div>
                <div className="header_text">
                    <h1>C. S. y A. Ferro Carril Oeste</h1>
                </div>  
                <div className="header_text_CS">
                    <BsPersonCircle /*onClick={()=>navigate("/perfil" )}*/ size={'4rem'} color="white" ></BsPersonCircle>
                    <button onClick={()=>navigate("/" )}>Cerrar Sesión</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
   .header{
    position:fixed;
    width:100%;
	height:50px; 
	background-color:rgba(0, 215, 0, 1) ;
	display:table;
    img {
        height: 5rem;
   }
 }
 h1{
    color:white;
    text-decoration:bold;
 }

BsPersonCircle{
	display:table-cell;
	text-align:center;
	vertical-align:middle;  
    margin:0 0 0 2px;
    transform-origin: 10px 10px;
}

.header_text{   
	display:table-cell;
	text-align: left;
	vertical-align:middle;    
    font-size:2rem;
    color: white;
}
.header_text_CS{
	display:table-cell;
	text-align: right;
	vertical-align:middle;    
    font-size:1rem;
    padding-right: 20px;
}
     button {
    padding: 0,5rem 1rem 1rem;
    border: none;
    cursor: pointer;
    color: black;
    border-radius: o,2rem;
    font-size:1.05rem;
    background: none;
    color: white;
    text-decoration: underline;
   }
`;