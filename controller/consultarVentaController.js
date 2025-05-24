import Ventas from '../models/VentaDatos';
import VentasDatos from "../models/VentaDatos";

export default class ConsultarVentaController {
    constructor() {
        this.informacion = new VentasDatos();
        this.tabla = document.querySelector('.content-table tbody');
        this.buscador = document.querySelector('.Buscar');
        this.btnFiltrar = document.querySelector('.btnFiltrar');

        this.btnFiltrar.addEventListener('click', (e) => {
            e.preventDefault();
            this.filtrar();
        });
        this.mostrarTodas();
    }

    mostrarTodas() {
        this.mostrarEnTabla(this.informacion.ventas);
    }

    filtrar(){
        const texto = this.buscador.value;
        const resultados = this.informacion.buscar(texto);
        this.mostrarEnTabla(resultados);
    }

    mostrarEnTabla(ventas){
        this.tabla.innerHTML = '';

        ventas.forEach(venta => {
            const fila = `
            <tr>
                    <td>${venta.cliente}</td>
                    <td>${venta.nOrden}</td>
                    <td>${venta.fechaConversion()}</td>
                    <td>${venta.precio}$</td>
                    <td>${venta.estado}</td>
                </tr>
            
            `;
            this.tabla.innerHTML += fila;
        })
    }

}