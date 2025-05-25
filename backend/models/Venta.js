class Venta {
    constructor(cliente, nOrden, fecha, precio, estado) {
        this.cliente = cliente;
        this.nOrden = nOrden;
        this.fecha = fecha;
        this.precio = precio;
        this.estado = estado;
    }
}

module.exports = {
    Venta
}; 