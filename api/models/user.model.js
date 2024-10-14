const sql = require("../db/db.js");

// Constructor para Usuario
const Usuario = function (usuario) {
    this.ID_Administrador = usuario.ID_Administrador;
    this.Nombre = usuario.Nombre;
    this.Apellido = usuario.Apellido;
    this.Email = usuario.Email;
    this.Usuario = usuario.Usuario;
    this.Contraseña = usuario.Contraseña;
    this.Rol = usuario.Rol;
};

// Constructor para Persona
const Persona = function (persona) {
    this.nro_socio = persona.nro_socio;
    this.apellido_nombre = persona.apellido_nombre;
    this.documento = persona.documento;
    this.direccion = persona.direccion;
    this.telefono = persona.telefono;
    this.email = persona.email;
    this.fecha_inicio = persona.fecha_inicio;
    this.es_socio = persona.es_socio;
};

// Método para obtener todas las personas
Persona.getAllPersonas = (result) => {
    let query = "SELECT * FROM personas";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("personas: ", res);
        result(null, res);
    });
};

// Método para obtener solo socios
Persona.getSocios = (result) => {
    let query = "SELECT * FROM personas WHERE es_socio=1";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("personas: ", res);
        result(null, res);
    });
};

// Método para obtener solo abonados
Persona.getAbonados = (result) => {
    let query = "SELECT * FROM personas WHERE es_socio=0";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("personas: ", res);
        result(null, res);
    });
};

// Método para obtener todos los administradores
Usuario.getAll = (result) => {
    let query = "SELECT * FROM usuario WHERE rol = 'administrador'";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("administradores: ", res);
        result(null, res);
    });
};


// Exportar ambos modelos
module.exports = {
    Usuario: Usuario,
    Persona
};
