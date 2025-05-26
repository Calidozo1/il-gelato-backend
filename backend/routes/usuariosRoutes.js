const express = require('express');
const router = express.Router();
const { crearPerfil, iniciarSesion } = require('../controllers/controladorUsuario');

// Registrar usuario
router.post('/registrar', async (req, res) => {
    const { nombre, email, cedula, password, phone } = req.body;

    try {
        const resultado = await crearPerfil(nombre, email, cedula, password, phone);
        if (resultado.exito) {
            res.status(200).json(resultado);
        } else {
            res.status(400).json(resultado);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const resultado = await iniciarSesion(email, password);
        if (resultado.exito) {
            res.status(200).json(resultado);
        } else {
            res.status(401).json(resultado);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
    }
});

module.exports = router;