const express = require("express");
const path = require("path");
const productoRoutes = require("./backend/routes/productoRoutes");

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "frontend/public")));


// Usar rutas del backend
app.use("/api/productos", productoRoutes);

// Servir el archivo HTML principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/views/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

const multer = require('multer');
const upload = multer({ dest: 'frontend/public/img/' });

app.post('/api/productos/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
  }
  const rutaImagen = `/img/${req.file.filename}`;
  res.json({ imagen: rutaImagen });
});