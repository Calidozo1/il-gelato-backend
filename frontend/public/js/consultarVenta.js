document.addEventListener("DOMContentLoaded", () => {
    const ventasBody = document.querySelector(".content-table tbody");
    const buscarInput = document.getElementById("buscarInput");
    const fechaInput = document.getElementById("fechaInput");
    const formFiltro = document.querySelector(".filtro");

    // Cargar ventas al iniciar
    cargarVentas();

    // Manejar el filtrado
    formFiltro.addEventListener("submit", async (e) => {
        e.preventDefault();
        await cargarVentas();
    });

    async function cargarVentas() {
        try {
            // Construir URL con parámetros
            const params = new URLSearchParams();
            if (buscarInput.value) params.append('buscar', buscarInput.value);
            if (fechaInput.value) params.append('fecha', fechaInput.value);

            const response = await fetch(`/api/ventas?${params.toString()}`);
            const ventas = await response.json();

            mostrarVentas(ventas);
        } catch (error) {
            console.error("Error:", error);
            ventasBody.innerHTML = `<tr><td colspan="5">Error al cargar ventas</td></tr>`;
        }
    }

    function mostrarVentas(ventas) {
        ventasBody.innerHTML = ventas.length > 0
            ? ventas.map(venta => `
                <tr>
                    <td>${venta.cliente}</td>
                    <td>${venta.nOrden}</td>
                    <td>${venta.fecha.split('-').reverse().join('/')}</td>
                    <td>$${venta.precio.toFixed(2)}</td>
                    <td>${venta.estado}</td>
                </tr>
              `).join('')
            : `<tr><td colspan="5">No se encontraron ventas</td></tr>`;
    }
});