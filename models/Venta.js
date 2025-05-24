export default class Venta {
    constructor(cliente, nOrden, fecha, precio, estado) {
        this.cliente = cliente;
        this.nOrden = nOrden;
        this.fecha = fecha = new Date(fecha);
        this.precio = precio;
        this.estado = estado;
    }

    fechaConversion(){
        return this.fecha.toLocaleDateString('es-ES');
    }
}