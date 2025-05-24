// routes/authRoutes.js
const express = require("express");
const router = express.Router();

// Rutas para vistas
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/registrarse", (req, res) => {
    res.render("registrarse");
});



module.exports = router;