import React, { useState } from "react";
import { Container } from "./TablesStyles";
import { useNavigate } from "react-router-dom"; 
import { Form, Button, Alert, Spinner } from 'react-bootstrap'; 

export default function New() {
    const [nuevoPago, setNuevoPago] = useState({
        montoTotal: '',
        cuotasPagadas: '',
        fechaInicio: '',
        fechaVencimiento: '',
        idSocio: '',
        idCuota: '',
        idAdministrador: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNuevoPago({ ...nuevoPago, [e.target.name]: e.target.value });
        setError(''); // Resetea el error al cambiar un campo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Inicia el loading

        const pagoParaEnviar = {
            Fecha_Inicio: nuevoPago.fechaInicio,
            Fecha_Vencimiento: nuevoPago.fechaVencimiento,
            Cuotas_Pagadas: nuevoPago.cuotasPagadas,
            Monto_Total: nuevoPago.montoTotal,
            ID_Socio: nuevoPago.idSocio,
            ID_Cuota: nuevoPago.idCuota,
            ID_Administrador: nuevoPago.idAdministrador,
        };

        try {
            const response = await fetch('http://localhost:8080/pagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pagoParaEnviar),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Captura el error del backend
                throw new Error(errorData.message || 'Error al crear el nuevo pago');
            }

            const result = await response.json();
            alert('Pago registrado exitosamente!');
            navigate('/pay'); 
        } catch (error) {
            setError(error.message); // Almacena el mensaje de error
        } finally {
            setLoading(false); // Finaliza el loading
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Registrar Nuevo Pago</h1>
                {error && <Alert variant="danger">{error}</Alert>} {/* Mensaje de error */}

                <Form.Group controlId="formMontoTotal">
                    <Form.Label>Monto Total:</Form.Label>
                    <Form.Control
                        type="number"
                        name="montoTotal"
                        value={nuevoPago.montoTotal}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCuotasPagadas">
                    <Form.Label>Cuotas Pagadas:</Form.Label>
                    <Form.Control
                        type="number"
                        name="cuotasPagadas"
                        value={nuevoPago.cuotasPagadas}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formFechaInicio">
                    <Form.Label>Fecha de Inicio:</Form.Label>
                    <Form.Control
                        type="date"
                        name="fechaInicio"
                        value={nuevoPago.fechaInicio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formFechaVencimiento">
                    <Form.Label>Fecha de Vencimiento:</Form.Label>
                    <Form.Control
                        type="date"
                        name="fechaVencimiento"
                        value={nuevoPago.fechaVencimiento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formIdSocio">
                    <Form.Label>ID Socio:</Form.Label>
                    <Form.Control
                        type="number"
                        name="idSocio"
                        value={nuevoPago.idSocio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formIdCuota">
                    <Form.Label>ID Cuota:</Form.Label>
                    <Form.Control
                        type="number"
                        name="idCuota"
                        value={nuevoPago.idCuota}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formIdAdministrador">
                    <Form.Label>ID Administrador:</Form.Label>
                    <Form.Control
                        type="number"
                        name="idAdministrador"
                        value={nuevoPago.idAdministrador}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="text-center">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Guardar'}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/pay')} style={{ marginLeft: '10px' }}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
