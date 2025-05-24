import Venta from './Venta.js';

export default class VentasDatos{
    constructor(){
        this.ventas = [
            new Venta("Valentina Da Camara",
                   "AA002",
                    "2024-11-13",
                    5.4,
                   "Pagado"),
            new Venta("Juan Pérez",
                    "AA003",
                     "2024-12-12",
                7.8,
                "Pendiente"),
        ]
    }

    buscar(filtro) {
        return this.ventas.filter(ventas => {
            let textoCoincide = venta.cliente.indexOf(filtro) || venta.nOrden.includes(filtro);
            return textoCoincide;
        });
    }
};