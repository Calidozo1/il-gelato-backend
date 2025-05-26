const express = require("express");
const path = require("path");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "frontend/public")));

// Rutas API
const productoRoutes = require("./backend/routes/productoRoutes");
const rutaUsuarios = require('./backend/routes/usuariosRoutes');

app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", rutaUsuarios);

// Rutas frontend (vistas)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/login.html"));
});

app.get("/registrarse", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/registrarse.html"));
});

const PORT = 3000;
app.listen(PORT, () =>
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);