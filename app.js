const express = require("express");
const path = require("path");
const productoRoutes = require("./backend/routes/productoRoutes");

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "frontend/public")));

//Ruta para servir la pagina de inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "index.html"));
});

//ruta para servir la pagina de login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "login.html"));
});

//ruta para servir la pagina de sign up
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "signup.html"));
});
//Ruta para la pagina de ventas
app.get("/consultar-ventas", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "Consultar_Venta.html"));
});

// Usar rutas del backend
app.use("/api/productos", productoRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));