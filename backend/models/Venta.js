class Venta {
    constructor(cliente, nOrden, fecha, precio, estado) {
        this.cliente = cliente;
        this.nOrden = nOrden;
        this.fecha = fecha;
        this.precio = precio;
        this.estado = estado;
    }
}

const ventas = [
    new Venta("Valentina Da Camara", "AA002", "2025-05-20", 5.4, "Pendiente"),
    new Venta("Pedro Da Silva", "AA003", "2025-06-21", 2.7, "Entregado"),
    new Venta("María Rodríguez", "AA004", "2025-05-20", 8.1, "Pendiente"),
    new Venta("Carlos Gómez", "AA005", "2025-06-21", 3.5, "Entregado")
];

module.exports = { Venta, ventas };