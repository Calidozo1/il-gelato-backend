const connection = require("../config/db");

class Producto {
    constructor(id, nombre, descripcion, precio, stock, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }

    static obtenerTodos(callback) {
        connection.query("SELECT * FROM productos", (err, resultados) => {
            if (err) return callback(err, null);
            callback(null, resultados);
        });
    }

    static agregar(producto, callback) {
        connection.query(
            "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
            [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.imagen],
            (err, resultado) => {
                if (err) return callback(err, null);
                callback(null, resultado.insertId);
            }
        );
    }

    static eliminarPorId(id, callback) {
        connection.query("DELETE FROM productos WHERE id = ?", [id], (err, resultado) => {
            if (err) return callback(err, null);
            callback(null, resultado.affectedRows > 0);
        });
    }
}

module.exports = Producto;
