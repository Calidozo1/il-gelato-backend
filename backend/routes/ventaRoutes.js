const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/consultarVentaController");

// Unificamos las rutas
router.get("/", ventaController.getVentas); // Eliminamos /filtrar

module.exports = router;