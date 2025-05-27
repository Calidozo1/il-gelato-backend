const Producto = require("../models/Producto");

exports.obtenerProductos = (req, res) => {
    Producto.obtenerTodos((err, productos) => {
        if (err)
            return res.status(500).json({ mensaje: "Error al obtener productos", error: err });
        res.json(productos);
    });
};

exports.agregarProducto = (req, res) => {
    // Imprime el body para depurar
    console.log("Datos recibidos en agregarProducto:", req.body);

    const { nombre, descripcion, precio, stock, imagen } = req.body;
    if (!nombre || !descripcion || !precio || !stock || !imagen) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Crea el nuevo producto. El campo id se coloca en null ya que MySQL lo generará automáticamente.
    const nuevoProducto = new Producto(null, nombre, descripcion, precio, stock, imagen);

    // Usa el método agregar definido en el modelo, que utiliza la conexión ya configurada.
    Producto.agregar(nuevoProducto, (err, insertId) => {
        if (err) {
            console.error("Error en MySQL:", err);
            return res.status(500).json({ mensaje: "Error al agregar producto", error: err });
        }
        res.status(201).json({ id: insertId, nombre, descripcion, precio, stock, imagen });
    });
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    Producto.eliminarPorId(id, (err, eliminado) => {
        if (err)
            return res.status(500).json({ mensaje: "Error al eliminar producto", error: err });
        if (!eliminado)
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json({ mensaje: "Producto eliminado correctamente" });
    });
};

