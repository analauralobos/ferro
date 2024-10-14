const { Usuario: Usuario, Persona } = require("../models/user.model.js");

// Función para listar todos los administradores
exports.list = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar los administradores."
      });
    else res.send({ status: 200, data });
  });
};

// Función para listar todas las personas
exports.listPersonas = (req, res) => {
  Persona.getAllPersonas((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar las personas."
      });
    else res.send({ status: 200, data });
  });
};

// Función para listar los socios
exports.listSocios = (req, res) => {
  Persona.getSocios((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar los socios."
      });
    else res.send({ status: 200, data });
  });
};

// Función para listar los abonados
exports.listAbonados = (req, res) => {
  Persona.getAbonados((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar los abonados."
      });
    else res.send({ status: 200, data });
  });
};
