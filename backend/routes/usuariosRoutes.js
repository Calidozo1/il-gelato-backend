const express = require('express');
const router = express.Router();

const { crearPerfil } = require('../controllers/controladorPerfil');

router.post('/registrar', (req, res) => {
    const { nombre, email, cedula, password, phone } = req.body;

    const resultado = crearPerfil(nombre, email, cedula, password, phone);
    if (resultado.exito) {
        res.status(200).json(resultado);
    } else {
        res.status(400).json(resultado);
    }
});

module.exports = router;