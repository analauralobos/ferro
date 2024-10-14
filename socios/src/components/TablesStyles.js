import styled from "styled-components";

export const Container = styled.div`
  width: 100%;  
  margin: auto;
  padding: 20px;
  padding-top: 40px; 
  background-color: rgba(240, 240, 240, 0.9);
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  h1 {
    text-align: left;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, select {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;


export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Permite el desplazamiento horizontal si es necesario */
  margin-top: 20px; /* Espacio superior para separar de los elementos anteriores */
`;

export const Table = styled.table`
  width: 100%; /* Ancho completo de la tabla */
  border-collapse: collapse; /* Elimina espacios entre celdas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para profundidad */
`;

export const TableHeader = styled.thead`
  background-color: #4CAF50; /* Color de fondo para el encabezado */
  color: white; /* Color del texto */
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f2f2f2; /* Color de fondo para filas pares */
  }
`;

export const TableCell = styled.td`
  padding: 12px; /* Espacio interno en las celdas */
  border: 1px solid #ddd; /* Borde sutil */
  text-align: left; /* Alineación del texto */
`;

export const TableHeaderCell = styled.th`
  padding: 12px; /* Espacio interno en las celdas del encabezado */
  border: 1px solid #ddd; /* Borde sutil */
  text-align: left; /* Alineación del texto */
`;
// Estilo para los botones
export const Button = styled.button`
    background-color: #4CAF50; /* Color verde */
    color: white; /* Texto blanco */
    padding: 10px 15px; /* Espaciado interno */
    border: none; /* Sin borde */
    border-radius: 5px; /* Bordes redondeados */
    cursor: pointer; /* Manita al pasar el mouse */
    margin-top: 10px; /* Espaciado superior */

    &:hover {
        background-color: #45a049; /* Color verde más oscuro al pasar el mouse */
    }
`;