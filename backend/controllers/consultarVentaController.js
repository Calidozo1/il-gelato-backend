const { Venta } = require('../models/Venta');

class VentaController {
    constructor() {
        this.ventas = [
            new Venta("Valentina Da Camara", "AA002", "2025-05-20", 5.4, "Pendiente"),
            new Venta("Pedro Da Silva", "AA003", "2025-06-21", 2.7, "Pendiente"),
            new Venta("Jeremey Nava", "AA004", "2025-06-22", 12.9, "Pendiente"),
            new Venta("Yilmary Beta", "AA005", "2025-06-23", 8.5, "Entregado"),
        ];
    }

    obtenerTodas() {
        return this.ventas;
    }

    filtrarPorTexto(texto) {
        if (!texto) return this.ventas;

        const textoLower = texto.toLowerCase();
        return this.ventas.filter(venta =>
            venta.cliente.toLowerCase().includes(textoLower) ||
            venta.nOrden.toLowerCase().includes(textoLower)
        );
    }

    filtrarVentas({ texto, fecha }) {
        let ventasFiltradas = this.ventas;

        if (texto) {
            ventasFiltradas = this.filtrarPorTexto(texto);
        }

        if (fecha) {
            ventasFiltradas = ventasFiltradas.filter(venta =>
                venta.fecha === fecha
            );
        }

        return ventasFiltradas;
    }

    obtenerPorNOrden(nOrden) {
        return this.ventas.find(venta => venta.nOrden === nOrden);
    }
}

module.exports = new VentaController();