const Producto = require("../models/Producto");

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
    Producto.obtenerTodos((err, productos) => {
        if (err) return res.status(500).json({ mensaje: "Error al obtener productos", error: err });
        res.json(productos);
    });
};

// Agregar un nuevo producto
exports.agregarProducto = (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const nuevoProducto = new Producto(null, nombre, descripcion, precio, stock, imagen, categoria);

    Producto.agregar(nuevoProducto, (err, insertId) => {
        if (err) return res.status(500).json({ mensaje: "Error al agregar producto", error: err });
        res.status(201).json({ id: insertId, ...nuevoProducto });
    });
};

// Eliminar un producto por ID
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    Producto.eliminarPorId(id, (err, eliminado) => {
        if (err) return res.status(500).json({ mensaje: "Error al eliminar producto", error: err });

        if (!eliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json({ mensaje: "Producto eliminado correctamente" });
    });
};

