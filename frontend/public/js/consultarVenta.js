document.addEventListener("DOMContentLoaded", () => {
    const buscarInput = document.querySelector('.Buscar');
    const fechaInput = document.querySelector('.fecha');
    const filtrarBtn = document.querySelector('.btn-filtrar');
    const tablaBody = document.querySelector('.content-table tbody');

    const ventasIniciales = ventaController.obtenerTodas();
    mostrarVentas(ventasIniciales);

    filtrarBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        const ventasFiltradas = ventaController.filtrarVentas({
            texto: buscarInput.value,
            fecha: fechaInput.value
        });
        mostrarVentas(ventasFiltradas);
    });

    function mostrarVentas(ventas){
        tablaBody.innerHTML = ventas.map(venta => `
        <tr>
            <td>${venta.cliente}</td>
            <td>${venta.nOrden}</td>
            <td>${venta.fecha}</td>
            <td>${venta.precio}$</td>
            <td>${venta.estado}</td>     
        <tr>   
        `).join('');
    }
});
