const express = require("express");
const path = require("path");
const productoRoutes = require("./backend/routes/productoRoutes");

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos como CSS, imágenes, JS
app.use(express.static(path.join(__dirname, "frontend/public")));

// Rutas de productos (API)
app.use("/api/productos", productoRoutes);

// ✅ Ruta para index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/index.html"));
});

// ✅ Ruta para login.html
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/login.html"));
});

// ✅ Ruta para register.html
app.get("/registrarse", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/registrarse.html"));
});

const PORT = 3000;
app.listen(PORT, () =>
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);