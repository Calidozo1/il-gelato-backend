const express = require("express");
const path = require("path");
const productoRoutes = require("./backend/routes/productoRoutes");
const ventaRoutes = require("./backend/routes/ventaRoutes");
const usuariosRoutes = require("./backend/routes/usuariosRoutes");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql2');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('./vista'));
app.set('views', './vista');
app.set('view engine', 'ejs');

// Conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$$BD77&f*',
    database: 'regitroventas'
});
connection.connect();








// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "frontend/public")));

//Ruta para servir la pagina de inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "index.ejs"));
});

//ruta para servir la pagina de login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "login.html"));
});

//ruta para servir la pagina de sign up
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "signup.html"));
});

// Ruta para servir la página de consultar ventas
app.get("/consultar-ventas", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "consultarVenta.html"));
});

// Ruta para consultar perfil
app.get("/consultarPerfil", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "consultarPerfil.html"));
});

// Ruta para ver catalogo
app.get('/catalogo', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "views", "index.ejs"));
})

// Usar rutas del backend
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Página principal
app.get('/registrar-ventas', function (req, res) {
    res.render('RegistrarVentas');
});

// Validaciones
function validarNombre(user) {
    return /^[a-zA-Z\s]+$/.test(user);
}
function validarNumero(number) {
    return /^[0-9]+$/.test(number);
}
function validarOrden(orden) {
    return /^[a-zA-Z\s]+$/.test(orden);
}

// Ruta para guardar datos en la BD
app.post('/guardardatos', async (req, res) => {
    try {
        // Obtener los datos del formulario
        const { user, number, orden,fecha, hora } = req.body;

        if (!validarNombre(user) || !validarNumero(number) || !validarOrden(orden)){
            throw new Error("Uno de los campos fue llenado de forma incorrecta");
        }

        // Insertar los datos en la base de datos (ejemplo)
        const values = [user,orden,fecha,hora,parseInt(number)];
        const query = `INSERT INTO ventas  (usuario,infopedido,fecha,hora,norden) VALUES (?) `;
        connection.query(query,[values]);

        // Responder al cliente
        res.render('exitoso')
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).render('RegistrarVentas',{error: error});
    }
});





const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
