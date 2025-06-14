class Producto {
    constructor(id, nombre, descripcion, precio, stock, imagen, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.categoria = categoria;
    }
}

// Base de datos en memoria (Array)
const productos = [
    new Producto(1, "Helado De Vainilla", "Suave y delicioso", 5.99, 20, "/frontend/plublic/img/icecream.png", "Helados"),
    new Producto(2, "Helado De Chocolate", "Postre italiano con café", 7.99, 15, "/frontend/plublic/img/icecream.png", "Postres"),
];

module.exports = { Producto, productos };
