import React, { useState, useEffect } from "react";
import { Container, Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableContainer } from "./TablesStyles"; // Importamos los estilos

const URLTodos = 'http://localhost:8080/personas';
const URLSocios = 'http://localhost:8080/personas/socios';
const URLAbonados = 'http://localhost:8080/abonados';

function Conectar(URL, searchTerm, cuota, tipoPersona) {
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('Error al obtener los datos');
                const data = await res.json();
                setPersonas(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    // Filtra por nombre, apellido o documento
    const filteredPersonas = personas.filter(persona => {
        const apellidoNombre = persona.apellido_nombre ? persona.apellido_nombre.toLowerCase() : '';
        const documento = persona.documento ? persona.documento.toLowerCase() : '';
        return apellidoNombre.includes(searchTerm.toLowerCase()) || documento.includes(searchTerm.toLowerCase());
    });

    // Filtra por cuota (Socio o Rifa)
    const filteredByCuota = filteredPersonas.filter(persona =>
        cuota === "todos" ? true : persona.tipo_cuota === cuota
    );

    // Filtra por tipo de persona (Socio o Abonado)
    const filteredByTipoPersona = filteredByCuota.filter(persona =>
        tipoPersona === "todos" ? true : persona.tipo_persona === tipoPersona
    );

    return { personTable: filteredByTipoPersona, loading, error };
}

export default function Tables() {
    const [url, setUrl] = useState(URLTodos);  // Estado para cambiar entre las URL
    const [i, setI] = useState(0);             // Paginación
    const [searchTerm, setSearchTerm] = useState('');  // Filtro de búsqueda
    const [cuota, setCuota] = useState("todos");   // Filtro de tipo de cuota
    const [tipoPersona, setTipoPersona] = useState("todos"); // Filtro de tipo de persona

    const { personTable, loading, error } = Conectar(url, searchTerm, cuota, tipoPersona);

    const handlePrev = () => {
        if (i > 0) setI(i - 10);
    };

    const handleNext = () => {
        if ((i + 10) < personTable.length) setI(i + 10);
    };

    const handleFilterChange = (e) => {
        setSearchTerm(e.target.value);  // Actualiza el filtro de búsqueda
    };

    const handleUrlChange = (e) => {
        const selectedValue = e.target.value;
        switch (selectedValue) {
            case 'socios':
                setUrl(URLSocios);
                break;
            case 'abonados':
                setUrl(URLAbonados);
                break;
            default:
                setUrl(URLTodos);
                break;
        }
    };

    const handleCuotaChange = (e) => {
        setCuota(e.target.value);
    };

    const handleTipoPersonaChange = (e) => {
        setTipoPersona(e.target.value);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            {/* Selector para elegir entre Todos, Socios o Abonados */}
            <select onChange={handleUrlChange} defaultValue="todos">
                <option value="todos">Todos</option>
                <option value="socios">Socios</option>
                <option value="abonados">Abonados</option>
            </select>

            {/* Filtro de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por nombre, apellido o DNI"
                value={searchTerm}
                onChange={handleFilterChange}
            />

            {/* Filtro para tipo de cuota (Socio o Rifa) */}
            <select onChange={handleCuotaChange} value={cuota}>
                <option value="todos">Tipo de Cuota (Todos)</option>
                <option value="Socio">Socio</option>
                <option value="Rifa">Rifa</option>
            </select>

            {/* Tabla de personas */}
            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell className="nro">Nº Socio</TableHeaderCell>
                            <TableHeaderCell>Apellido y Nombre</TableHeaderCell>
                            <TableHeaderCell className="dni">Documento</TableHeaderCell>
                            <TableHeaderCell>Dirección</TableHeaderCell>
                            <TableHeaderCell>Teléfono</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Fecha de Inicio</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {personTable.slice(i, i + 10).map((persona) => (
                            <tr key={persona.nro_socio}>
                                <TableCell className="nro">{persona.nro_socio}</TableCell>
                                <TableCell>{persona.apellido_nombre}</TableCell>
                                <TableCell className="dni">{persona.documento}</TableCell>
                                <TableCell>{persona.direccion}</TableCell>
                                <TableCell>{persona.telefono}</TableCell>
                                <TableCell>{persona.email}</TableCell>
                                <TableCell>{persona.fecha_inicio}</TableCell>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginación */}
            <div className="pagination">
                <button onClick={handlePrev} disabled={i === 0}>
                    Anterior
                </button>
                <button
                    onClick={handleNext}
                    disabled={(i + 10) >= personTable.length}
                >
                    Siguiente
                </button>
            </div>
        </Container>
    );
}
