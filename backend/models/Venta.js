class Venta {
    constructor(cliente, nOrden,pedido,precio,fecha,hora,estado) {
        this.cliente = cliente;
        this.nOrden = nOrden;
        this.pedido = pedido;
        this.precio = precio;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }
}

const ventas = [
    new Venta("Valentina Da Camara", "AA002", "Helado1",5.4,"2025-05-20",  "12:30:00","Pendiente"),
    new Venta("Pedro Da Silva", "AA003", "Helado2", 2.7,"2025-06-21", "08:30:00","Entregado"),
    new Venta("María González", "AA004", "Helado3",8.1,"2025-05-21","08:30:00" , "Entregado")
];

module.exports = { Venta, ventas };