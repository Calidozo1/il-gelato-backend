const { productos, Producto } = require("../models/Producto");

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
    res.json(productos);
};

// Agregar un nuevo producto
exports.agregarProducto = (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const nuevoProducto = new Producto(productos.length + 1, nombre, descripcion, precio, stock, imagen, categoria);
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
};

// Eliminar un producto por ID
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(prod => prod.id == id);

    if (index !== -1) {
        productos.splice(index, 1);
        res.json({ mensaje: "Producto.js eliminado correctamente" });
    } else {
        res.status(404).json({ mensaje: "Producto.js no encontrado" });
    }
};
