const express = require('express');
const router = express.Router();
const { iniciarSesion } = require('../controllers/registroController');
const { crearPerfil } = require('../controllers/registroController');

router.post('/signup', (req, res) => {
    const { nombre, email, cedula, password, phone } = req.body;

    const resultado = crearPerfil(nombre, email, cedula, password, phone);
    if (resultado.exito) {
        res.status(200).json(resultado);
    } else {
        res.status(400).json(resultado);
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const resultado = iniciarSesion(email, password);

    if (resultado.exito) {
        res.status(200).json(resultado);
    } else {
        res.status(401).json(resultado); // 401 = Unauthorized
    }
});

module.exports = router;