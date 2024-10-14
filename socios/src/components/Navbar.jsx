import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
    const links = [
        { name: "Inicio", link: "/home" },
        { name: "Tablas", link: "/table" },
        { name: "Cuotas", link: "/cuota" },
        { name: "Cobros", link: "/pay" },
    ];

    return (
        <Container>
            <nav className="flex">
                <div className="left flex a-center">
                    <ul className="links flex">
                        {links.map(({ name, link }) => (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: rgba(0, 215, 0, 1);
    top: 80px;
    border: solid 0.5px;
    position: fixed;
    z-index: 1000; /* Asegúrate de que el navbar esté encima de otros elementos */
    
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0; /* Asegúrate de que no haya padding */
    }

    li {
        float: left;
        display: block;
        color: white;
        text-align: center;
        padding: 10px 15px; /* Añadir un poco de padding para el texto */
    }

    li:hover {
        background-color: #111;
    }

    .links {
        list-style-type: none;
        gap: 2rem;
        li {
            a {
                color: white;
                text-decoration: none;
            }
        }
    }
`;
